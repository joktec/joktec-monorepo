import {
  BadRequestException,
  ConfigService,
  ForbiddenException,
  Injectable,
  JwtService,
  LogService,
  NotFoundException,
} from '@joktec/core';
import { hashPassword, matchPassword, plainToInstance } from '@joktec/utils';
import dayjs from 'dayjs';
import { head } from 'lodash';
import { I18nContext } from 'nestjs-i18n';
import { DEFAULT_LOCALE } from '../../app.constant';
import { AuthProviderType, AuthScope, OTPStatus, OTPType, SessionStatus, UserStatus } from '../../models/constants';
import { AuthProviderProfile } from '../../models/interfaces';
import { Otp, User } from '../../models/schemas';
import { OtpService } from '../otpLogs';
import { SessionService } from '../sessions';
import { UserService } from '../users';
import { AuthProvider } from './auth.provider';
import { AuthJwtConfig } from './configs';
import {
  LoginDto,
  LoginSsoDto,
  RefreshTokenDto,
  RegisterDto,
  RequestCodeDto,
  ResetDto,
  TokeResponseDto,
  VerifyCodeDto,
} from './models';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private logger: LogService,
    private jwtService: JwtService,
    private userService: UserService,
    private sessionService: SessionService,
    private otpService: OtpService,
    private authProvider: AuthProvider,
  ) {
    this.logger.setContext(AuthService.name);
  }

  /**
   *
   * @param input
   */
  async send(input: RequestCodeDto): Promise<Otp> {
    const authConfig = this.config.parseOrThrow(AuthJwtConfig, 'jwt');
    const [otpList, user] = await Promise.all([
      this.otpService.findLastOtpByEmail(input.email, input.type),
      this.userService.findByEmail(input.email),
    ]);

    if (user && input.type === OTPType.REGISTER) {
      const providerProfile = await this.authProvider.getDefaultProfile(input.email);
      if (user.providers.some(o => o.providerId === providerProfile.providerId)) {
        throw new BadRequestException('auth.EMAIL_REGISTERED');
      }
    }

    if (input.type === OTPType.RESET) {
      if (!user) throw new NotFoundException('user.USER_NOT_FOUND');
      if (user.status === UserStatus.DISABLED) throw new ForbiddenException('user.USER_DISABLED');
    }

    // 1. First send
    if (!otpList.length) {
      const locale = I18nContext.current()?.lang || DEFAULT_LOCALE;
      return this.otpService.createOtp(input.email, input.type, authConfig.pending, locale);
    }

    // 2. Check the last otp is expired, then restrict or retry
    const lastOTP: Otp = head(otpList);
    const now = dayjs().startOf('ms');
    const expired = dayjs(lastOTP.expired).startOf('ms');
    if (expired <= now) {
      if (otpList.length >= authConfig.limit) {
        await this.otpService.revokeOtp(lastOTP);
        throw new BadRequestException('auth.RESTRICT_SEND_OTP');
      }
      return this.otpService.extendOtp(lastOTP, authConfig.pending);
    }

    // 3. Still available but reject send otp
    const duration = dayjs.duration(now.diff(expired));
    const seconds: number = Math.abs(duration.asSeconds());
    throw new BadRequestException('auth.OTP_PENDING', { expiredInSeconds: seconds });
  }

  /**
   * Verify OTP
   * @param input
   */
  async verifyOtp(input: VerifyCodeDto): Promise<Otp> {
    const otp: Otp = await this.otpService.findByPrivateCode(input.privateCode);
    if (!otp || otp.publicCode !== input.publicCode || otp.status !== OTPStatus.ACTIVATED) {
      throw new BadRequestException('auth.PUBLIC_CODE_INVALID');
    }

    const now = dayjs().startOf('ms');
    const expired = dayjs(otp.expired).startOf('ms');
    if (now >= expired) {
      await this.otpService.update(otp._id, { status: OTPStatus.EXPIRED });
      throw new BadRequestException('auth.PUBLIC_CODE_EXPIRED');
    }

    return this.otpService.confirmOtp(otp);
  }

  /**
   * Register new user with default provider using password
   * @param input
   */
  async register(input: RegisterDto): Promise<TokeResponseDto> {
    // Verify email and activeCode
    const { activeCode, email } = input;
    const otp = await this.otpService.findByActiveCode(activeCode);
    if (!otp || otp?.status !== OTPStatus.VERIFIED) throw new BadRequestException('auth.SESSION_INVALID');
    if (otp.email !== email) throw new BadRequestException('auth.EMAIL_NOT_MATCH');

    // Verify password
    const { password, confirmedPassword } = input;
    if (password !== confirmedPassword) throw new BadRequestException('auth.CONFIRMED_PASSWORD_NOT_MATCH');

    // Verify nickname
    if (input.nickname) {
      const existNickname = await this.userService.checkExistNickname(input.nickname, input.email);
      if (existNickname) throw new BadRequestException('auth.NICK_NAME_EXISTED');
    }

    // Create provider
    const { nickname, avatar, fcmToken } = input;
    const providerProfile = await this.authProvider.getDefaultProfile(email);
    let user = await this.userService.upsertByProvider(providerProfile, nickname, avatar);
    user = await this.userService.update(user._id, { password: hashPassword(password) });
    await this.otpService.finishOtp(otp);

    // Create token and return
    const token = await this.sessionService.registerToken(user, AuthScope.REGISTER, AuthProviderType.DEFAULT, fcmToken);

    const profile = await this.userService.getSimpleProfile(user._id);
    return plainToInstance(TokeResponseDto, { ...token, profile });
  }

  /**
   *
   * @param input
   */
  async login(input: LoginDto): Promise<TokeResponseDto> {
    const { password, fcmToken } = input;
    const user = await this.userService.findByEmail(input.email);
    if (!user) throw new NotFoundException('user.USER_NOT_FOUND');
    if (!user.password) throw new NotFoundException('user.USER_NOT_SET_PASSWORD');
    if (user.status === UserStatus.DISABLED) throw new ForbiddenException('user.USER_DISABLED');
    if (!matchPassword(password, user.password)) throw new BadRequestException('auth.PASSWORD_INVALID');

    const token = await this.sessionService.registerToken(user, AuthScope.PASSWORD, AuthProviderType.DEFAULT, fcmToken);
    const profile = await this.userService.getSimpleProfile(user._id);
    return plainToInstance(TokeResponseDto, { ...token, profile });
  }

  async loginSso(input: LoginSsoDto): Promise<TokeResponseDto> {
    const { providerType, providerToken } = input;
    let providerProfile: AuthProviderProfile = null;
    switch (providerType) {
      case AuthProviderType.KAKAO:
        providerProfile = await this.authProvider.getKaKaoProfile(providerToken);
        break;
      case AuthProviderType.NAVER:
        providerProfile = await this.authProvider.getNaverProfile(providerToken);
        break;
      case AuthProviderType.AMAZON:
        providerProfile = await this.authProvider.getAmazonProfile(providerToken);
        break;
      case AuthProviderType.APPLE:
        providerProfile = await this.authProvider.getAppleProfile(providerToken);
        break;
      case AuthProviderType.FACEBOOK:
        providerProfile = await this.authProvider.getFacebookProfile(providerToken);
        break;
      case AuthProviderType.GOOGLE:
        providerProfile = await this.authProvider.getGoogleProfile(providerToken);
        break;
      case AuthProviderType.FIREBASE:
        providerProfile = await this.authProvider.getFirebaseProfile(providerToken);
        break;
      case AuthProviderType.DEFAULT:
      case AuthProviderType.GUEST:
      default:
        throw new BadRequestException('auth.PROVIDER_NOT_ALLOWED');
    }

    if (!providerProfile) throw new BadRequestException('auth.PROVIDER_CAN_NOT_PROCESS');
    let user = await this.userService.upsertByProvider(providerProfile);

    const defaultProvider = await this.authProvider.getDefaultProfile(user.email);
    if (defaultProvider) user = await this.userService.upsertByProvider(defaultProvider);

    if (user.status === UserStatus.DISABLED) throw new ForbiddenException('user.USER_DISABLED');

    const token = await this.sessionService.registerToken(user, AuthScope.SSO, providerType, input.fcmToken);
    const profile = await this.userService.getSimpleProfile(user._id);
    return plainToInstance(TokeResponseDto, { ...token, profile });
  }

  async reset(input: ResetDto): Promise<TokeResponseDto> {
    const { email, activeCode, password, confirmedPassword, fcmToken } = input;
    const [otp, user] = await Promise.all([
      this.otpService.findByActiveCode(activeCode),
      this.userService.findByEmail(email),
    ]);

    if (!otp || otp?.status !== OTPStatus.VERIFIED) throw new BadRequestException('auth.SESSION_INVALID');
    if (otp.email !== user.email) throw new BadRequestException('auth.EMAIL_NOT_MATCH');
    if (!user) throw new NotFoundException('user.USER_NOT_FOUND');
    if (user.status === UserStatus.DISABLED) throw new ForbiddenException('user.USER_DISABLED');
    if (password !== confirmedPassword) throw new BadRequestException('auth.CONFIRMED_PASSWORD_NOT_MATCH');

    await this.userService.update(user._id, { password: hashPassword(password) });
    const token = await this.sessionService.registerToken(user, AuthScope.RESET, AuthProviderType.DEFAULT, fcmToken);
    const profile = await this.userService.getSimpleProfile(user._id);
    return plainToInstance(TokeResponseDto, { ...token, profile });
  }

  async refresh(input: RefreshTokenDto): Promise<TokeResponseDto> {
    const [acTokenDecode, rfTokenDecode] = await Promise.all([
      this.jwtService.decode(input.accessToken),
      this.jwtService.verifyRefreshToken(input.refreshToken),
    ]);

    if (acTokenDecode.sub !== rfTokenDecode.sub && acTokenDecode.jti !== rfTokenDecode.jti) {
      throw new BadRequestException('auth.TOKEN_NOT_MATCH');
    }

    const [user, session] = await Promise.all([
      this.userService.findById(rfTokenDecode.sub),
      this.sessionService.findByTokenId(rfTokenDecode.jti),
    ]);
    if (!session) {
      throw new BadRequestException('auth.SESSION_NOT_FOUND');
    }
    if (session.revokedAt || session.status === SessionStatus.DISABLED) {
      throw new BadRequestException('auth.TOKEN_REVOKED');
    }
    if (session.userType !== User.name || user._id.toString() !== session.userRefId.toString()) {
      throw new BadRequestException('auth.TOKEN_OWNER_INVALID');
    }

    await this.sessionService.update(session._id, { status: SessionStatus.DISABLED, revokedAt: new Date() });

    const fcmToken = input.fcmToken || session.fcmToken;
    const token = await this.sessionService.registerToken(user, AuthScope.REFRESH, acTokenDecode.provider, fcmToken);
    const profile = await this.userService.getSimpleProfile(user._id);
    return plainToInstance(TokeResponseDto, { ...token, profile });
  }
}
