import {
  BadRequestException,
  ConfigService,
  ExpressRequest,
  ForbiddenException,
  generateOTP,
  generateUUID,
  hashPassword,
  Inject,
  Injectable,
  isStrongPassword,
  IUserAgent,
  JwtPayload,
  JwtService,
  matchPassword,
  NotFoundException,
  REQUEST,
  ValidatorBuilder,
} from '@joktec/core';
import moment from 'moment';
import { OTPStatus, OTPType, SessionStatus, UserStatus } from '../../models/constants';
import { Otp, User } from '../../models/entities';
import { getGravatar, Gravatar } from '../../models/objects';
import { PASSWORD_OPTIONS } from '../../utils';
import { OtpService } from '../otpLogs';
import { SessionService } from '../sessions';
import { UserService } from '../users';
import { AuthConfig } from './auth.config';
import {
  LoginDto,
  LoginSsoDto,
  RefreshTokenDto,
  RegisterDto,
  ResetDto,
  SendOtpDto,
  TokeResponseDto,
  VerifyOtpDto,
} from './models';

@Injectable()
export class AuthService {
  constructor(
    @Inject(REQUEST) private request: ExpressRequest,
    private config: ConfigService,
    private jwtService: JwtService,
    private otpService: OtpService,
    private sessionService: SessionService,
    private userService: UserService,
  ) {}

  async send(input: SendOtpDto): Promise<Otp> {
    const authCfg = this.config.parse(AuthConfig, 'guard');
    const [otpList, user] = await Promise.all([
      this.otpService.findLastOtpByPhone(input.phone, input.type),
      this.userService.findByPhone(input.phone),
    ]);

    if (user && input.type === OTPType.REGISTER) throw new BadRequestException('PHONE_REGISTERED');
    if ([OTPType.LOGIN, OTPType.RESET].indexOf(input.type) >= 0) {
      if (!user) throw new NotFoundException('USER_NOT_FOUND');
      if (user.status === UserStatus.DISABLED) {
        throw new ForbiddenException('USER_DISABLED');
      }
    }

    // 1. First send
    if (!otpList.length) {
      return this.otpService.create({
        phone: input.phone,
        publicCode: generateOTP(6),
        privateCode: generateUUID({ prefix: input.type }),
        type: input.type,
        retry: 1,
        expiredInSeconds: authCfg.pending,
        expired: moment().startOf('ms').add(authCfg.pending, 'second').toDate(),
        status: OTPStatus.ACTIVATED,
      });
    }

    // 2. Check the last otp is expired, then restrict or retry
    const lastOTP: Otp = otpList[0];
    const now = moment().startOf('ms');
    const expired = moment(lastOTP.expired).startOf('ms');
    if (expired <= now) {
      // 2.1. Restrict the number of send OTP
      if (otpList.length >= authCfg.limit) {
        await this.otpService.update(lastOTP._id, { status: OTPStatus.EXPIRED });
        throw new BadRequestException('RESTRICT_SEND_OTP');
      }

      // 2.2 Retry send OTP
      const retry: number = lastOTP.retry + 1;
      const expiredInSeconds: number = retry * authCfg.pending;
      await this.otpService.update(lastOTP._id, { status: OTPStatus.EXPIRED });
      return this.otpService.create({
        phone: lastOTP.phone,
        email: lastOTP.email,
        publicCode: generateOTP(6),
        privateCode: generateUUID({ prefix: input.type }),
        type: input.type,
        retry,
        expiredInSeconds,
        expired: moment().startOf('ms').add(expiredInSeconds, 'second').toDate(),
        status: OTPStatus.ACTIVATED,
      });
    }

    // 3. Still available but reject send otp
    if (expired > now) {
      const duration = moment.duration(now.diff(expired));
      const seconds: number = Math.abs(duration.asSeconds());
      throw new BadRequestException('OTP_PENDING', { expiredInSeconds: seconds });
    }
  }

  async verifyOtp(input: VerifyOtpDto): Promise<Otp> {
    const otp: Otp = await this.otpService.findByPrivateCode(input.privateCode);
    if (!otp || otp.publicCode !== input.publicCode || otp.status !== OTPStatus.ACTIVATED) {
      throw new BadRequestException('PUBLIC_CODE_INVALID_OR_EXPIRED');
    }

    const now = moment().startOf('ms');
    const expired = moment(otp.expired).startOf('ms');
    if (now >= expired) {
      await this.otpService.update(otp._id, { status: OTPStatus.EXPIRED });
      throw new BadRequestException('PUBLIC_CODE_INVALID_OR_EXPIRED');
    }

    return this.otpService.update(otp._id, {
      activeCode: generateUUID({ prefix: otp.type }),
      status: OTPStatus.VERIFIED,
    });
  }

  async register(input: RegisterDto): Promise<TokeResponseDto> {
    const builder = ValidatorBuilder.init();
    const otp = await this.otpService.findByActiveCode(input.activeCode);
    if (!otp || otp?.status !== OTPStatus.VERIFIED) throw new BadRequestException('SESSION_INVALID');
    if (otp.phone !== input.phone) builder.add('phone', 'PHONE_NOT_MATCH', input.phone);

    let inputHashPassword: string = null;
    if (!input.googleId && !input.facebookId) {
      if (!input.password) builder.add('password', 'PASSWORD_REQUIRED');
      if (!isStrongPassword(input.password, PASSWORD_OPTIONS)) builder.add('password', 'PASSWORD_WEEK', input.password);
      if (!input.confirmedPassword) builder.add('confirmedPassword', 'CONFIRMED_PASSWORD_REQUIRED');
      if (input.password !== input.confirmedPassword) {
        builder.add('confirmedPassword', 'CONFIRMED_PASSWORD_NOT_MATCH', input.confirmedPassword);
      }
      inputHashPassword = hashPassword(input.password);
    }

    const email = input.email || otp.email;
    if (email) {
      const existEmail = await this.userService.findByEmail(email);
      if (existEmail) builder.add('email', 'EMAIL_EXISTED', email);
    }

    builder.throw();
    const gravatar: Gravatar = await getGravatar(input.email || otp.email);
    const user = await this.userService.create({
      fullName: input.fullName || gravatar?.fullName || otp.phone,
      phone: input.phone || otp.phone,
      email: input.email || otp.email,
      hashPassword: inputHashPassword,
      googleId: input.googleId || null,
      facebookId: input.facebookId || null,
      status: UserStatus.ACTIVATED,
      image: input.image || gravatar?.photoUrl,
      thumbnail: input.thumbnail || gravatar?.thumbnailUrl,
    });

    await this.otpService.update(otp._id, { status: OTPStatus.SUCCESS });
    return this.createTokenAndUpdate(user, 'REGISTER');
  }

  async login(input: LoginDto): Promise<TokeResponseDto> {
    const user = await this.userService.findByPhone(input.phone);
    if (!user) throw new NotFoundException('USER_NOT_FOUND');
    if (user.status === UserStatus.DISABLED) throw new ForbiddenException('USER_DISABLED');
    if (!user.hashPassword) throw new BadRequestException('PASSWORD_NOT_SETUP');
    if (!matchPassword(input.password, user.hashPassword)) throw new BadRequestException('PASSWORD_INVALID');
    return this.createTokenAndUpdate(user, 'PASSWORD');
  }

  async loginSSO(input: LoginSsoDto): Promise<TokeResponseDto> {
    const user = await this.userService.findByUId(input.ssoId, input.platform);
    if (!user) throw new NotFoundException('USER_NOT_FOUND');
    if (user.status === UserStatus.DISABLED) throw new ForbiddenException('USER_DISABLED');
    return this.createTokenAndUpdate(user, 'SSO');
  }

  async reset(input: ResetDto): Promise<TokeResponseDto> {
    const [otp, user] = await Promise.all([
      this.otpService.findByActiveCode(input.activeCode),
      this.userService.findByPhone(input.phone),
    ]);

    if (!otp || otp?.status !== OTPStatus.VERIFIED) throw new BadRequestException('SESSION_INVALID');
    if (!user) throw new NotFoundException('USER_NOT_FOUND');
    if (user.status === UserStatus.DISABLED) throw new ForbiddenException('USER_DISABLED');

    const builder = ValidatorBuilder.init();
    if (otp.phone !== user.phone) builder.add('phone', 'PHONE_NOT_MATCH');
    if (!input.password) builder.add('password', 'PASSWORD_REQUIRED');
    if (!isStrongPassword(input.password, PASSWORD_OPTIONS)) builder.add('password', 'PASSWORD_WEEK', input.password);
    if (!input.confirmedPassword) builder.add('confirmedPassword', 'CONFIRMED_PASSWORD_REQUIRED');
    if (input.password !== input.confirmedPassword) {
      builder.add('confirmedPassword', 'CONFIRMED_PASSWORD_NOT_MATCH', input.confirmedPassword);
    }
    builder.throw();

    user.hashPassword = hashPassword(input.password);
    return this.createTokenAndUpdate(user, 'RESET');
  }

  async refresh(input: RefreshTokenDto): Promise<TokeResponseDto> {
    const [acTokenDecode, rfTokenDecode] = await Promise.all([
      this.jwtService.decode(input.accessToken),
      this.jwtService.verifyRefreshToken(input.refreshToken),
    ]);

    if (acTokenDecode.sub !== rfTokenDecode.sub && acTokenDecode.jti !== rfTokenDecode.jti) {
      throw new BadRequestException('TOKEN_NOT_MATCH');
    }

    const [user, session] = await Promise.all([
      this.userService.findById(rfTokenDecode.sub),
      this.sessionService.findByTokenId(rfTokenDecode.jti),
    ]);
    if (!session) throw new BadRequestException('SESSION_NOT_FOUND');
    if (session.revokedAt || session.status === SessionStatus.DISABLED) throw new BadRequestException('TOKEN_REVOKED');
    if (user._id.toString() !== session.userId.toString()) throw new BadRequestException('TOKEN_OWNER_INVALID');

    await this.sessionService.update(session._id, { status: SessionStatus.DISABLED, revokedAt: new Date() });
    return this.createTokenAndUpdate(user, 'REFRESH');
  }

  private async createTokenAndUpdate(user: User, loginMethod: string): Promise<TokeResponseDto> {
    const ua: IUserAgent = this.request.userAgent;
    const issuer = this.config.get<string>('gateway.swagger.server', 'http://localhost:9010');
    const payload: JwtPayload = {
      iss: issuer,
      sub: user._id,
      aud: [issuer],
      jti: generateUUID({ prefix: loginMethod }),
      userId: user._id,
      phone: user.phone,
      email: user.email,
    };
    const token = await this.jwtService.sign(payload);
    await this.sessionService.create({
      tokenId: payload.jti,
      expiresAt: token.expiredAt,
      status: SessionStatus.ACTIVATED,
      userId: payload.sub,
      createdBy: payload.sub,
      updatedBy: payload.sub,
      ipAddress: this.request.geoIp?.ipAddress,
      userAgent: ua.ua,
      os: ua.os,
      browser: ua.browser,
      device: ua.device,
      cpu: ua.cpu,
      engine: ua.engine,
    });

    if (loginMethod === 'REGISTER') {
      user.createdBy = user._id;
      user.updatedBy = user._id;
    }

    const profile = await this.userService.update(user._id, user);
    return { ...token, profile };
  }
}
