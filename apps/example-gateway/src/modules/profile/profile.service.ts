import {
  BadRequestException,
  ClientProxy,
  hashPassword,
  Inject,
  Injectable,
  JwtPayload,
  matchPassword,
  REQUEST,
} from '@joktec/core';
import { IRequest, TRANSPORT } from '../../app.constant';
import { SessionStatus } from '../../models/constants';
import { SessionService } from '../sessions';
import { UserService } from '../users';
import {
  UserFcmDto,
  UserLogoutDto,
  UserPasswordDto,
  UserProfileDto,
  UserProfileResponse,
  UserSetPasswordDto,
} from './models';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(REQUEST) private request: IRequest,
    @Inject(TRANSPORT.PROXY.USER) private userClient: ClientProxy,
    private userService: UserService,
    private sessionService: SessionService,
  ) {}

  async getProfile(payload: JwtPayload): Promise<UserProfileResponse> {
    return this.userService.getSimpleProfile(payload.sub);
  }

  async updateProfile(input: UserProfileDto, payload: JwtPayload): Promise<UserProfileResponse> {
    const loggedUser = this.request.loggedUser;

    if (input.nickname) {
      const existNickname = await this.userService.checkExistNickname(input.nickname, loggedUser.email);
      if (existNickname) throw new BadRequestException('auth.NICK_NAME_EXISTED');
    }

    const user = await this.userService.update(payload.sub, input);
    if (input.config && (input.config.language || input.config.topics)) {
      this.userClient.emit({ cmd: 'User.refreshTopic' }, { user });
    }

    return this.userService.getSimpleProfile(payload.sub);
  }

  async setPassword(input: UserSetPasswordDto, payload: JwtPayload): Promise<UserProfileResponse> {
    const user = await this.userService.findById(payload.sub);
    if (user.password) throw new BadRequestException('auth.PASSWORD_ALREADY_SETUP');
    if (input.password !== input.confirmedPassword) throw new BadRequestException('auth.CONFIRMED_PASSWORD_NOT_MATCH');
    await this.userService.update(user._id, { password: hashPassword(input.password) });
    return this.userService.getSimpleProfile(payload.sub);
  }

  async changePassword(input: UserPasswordDto, payload: JwtPayload): Promise<UserProfileResponse> {
    const user = await this.userService.findById(payload.sub);
    if (!user.password) throw new BadRequestException('auth.PASSWORD_NOT_SETUP');
    if (!matchPassword(input.oldPassword, user.password)) throw new BadRequestException('auth.OLD_PASSWORD_NOT_MATCH');
    if (input.password === input.oldPassword) throw new BadRequestException('auth.DUPLICATE_OLD_PASSWORD');
    if (input.password !== input.confirmedPassword) throw new BadRequestException('auth.CONFIRMED_PASSWORD_NOT_MATCH');
    await this.userService.update(user._id, { password: hashPassword(input.password) });
    return this.userService.getSimpleProfile(payload.sub);
  }

  async updateFcmToken(input: UserFcmDto, payload: JwtPayload): Promise<UserProfileResponse> {
    const [user, session] = await Promise.all([
      this.userService.findById(payload.sub),
      this.sessionService.findByTokenId(payload.jti),
    ]);
    const newSession = await this.sessionService.update(session._id, { fcmToken: input.fcmToken });

    if (session.fcmToken) {
      this.userClient.emit(
        { cmd: 'User.resubscribeToTopic' },
        { user, session: newSession, oldFcmToken: session.fcmToken },
      );
    }
    return this.userService.getSimpleProfile(payload.sub);
  }

  async revokedMe(payload: JwtPayload): Promise<UserLogoutDto> {
    const session = await this.sessionService.findByTokenId(payload.jti);
    if (session) {
      await this.sessionService.update(session._id, { status: SessionStatus.DISABLED, revokedAt: new Date() });
      this.userClient.emit({ cmd: 'User.unsubscribeFromTopic' }, { session });
    }
    return { success: true };
  }

  async revokedOther(tokenIds: string[], payload: JwtPayload): Promise<UserLogoutDto> {
    const filterTokens = tokenIds.filter(jti => jti !== payload.jti);
    const sessions = await this.sessionService.find({ condition: { tokenId: { $in: filterTokens } } });
    if (sessions.length) {
      for (const session of sessions) {
        await this.sessionService.update(session._id, { status: SessionStatus.DISABLED, revokedAt: new Date() });
        this.userClient.emit({ cmd: 'User.unsubscribeFromTopic' }, { session });
      }
    }
    return { success: true };
  }
}
