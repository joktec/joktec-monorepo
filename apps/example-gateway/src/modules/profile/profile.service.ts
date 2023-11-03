import {
  hashPassword,
  Injectable,
  isStrongPassword,
  JwtPayload,
  matchPassword,
  ValidateBuilder,
  ValidateException,
} from '@joktec/core';
import { isEmpty } from 'lodash';
import { PASSWORD_OPTIONS } from '../../utils';
import { SessionService } from '../sessions';
import { SessionStatus } from '../sessions/models';
import { UserService } from '../users';
import { UserFcmDto, UserLogoutDto, UserPasswordDto, UserProfile, UserProfileDto } from './models';

@Injectable()
export class ProfileService {
  constructor(
    private userService: UserService,
    private sessionService: SessionService,
  ) {}

  async getProfile(payload: JwtPayload): Promise<UserProfile> {
    return this.userService.findById(payload.sub);
  }

  async updateProfile(input: UserProfileDto, payload: JwtPayload): Promise<UserProfile> {
    const user = await this.userService.findById(payload.sub);
    if (input.email) {
      const existEmail = await this.userService.findByEmail(input.email, user._id);
      if (existEmail) throw new ValidateException({ email: ['EMAIL_EXISTED'] });
    }
    return this.userService.update(payload.sub, input, payload);
  }

  async changePassword(input: UserPasswordDto, payload: JwtPayload): Promise<UserProfile> {
    const user = await this.userService.findById(payload.sub);

    const builder = ValidateBuilder.init();
    if (!matchPassword(input.oldPassword, user.hashPassword)) builder.add('oldPassword', 'OLD_PASSWORD_NOT_MATCH');
    if (input.password === input.oldPassword) builder.add('password', 'DUPLICATE_OLD_PASSWORD');
    if (!isStrongPassword(input.password, PASSWORD_OPTIONS)) builder.add('password', 'PASSWORD_WEEK');
    if (!input.confirmedPassword) builder.add('confirmedPassword', 'CONFIRMED_PASSWORD_REQUIRED');
    if (input.password !== input.confirmedPassword) builder.add('confirmedPassword', 'CONFIRMED_PASSWORD_NOT_MATCH');

    const validateError = builder.build();
    if (!isEmpty(validateError)) throw new ValidateException(validateError);

    return this.userService.update(user._id, { hashPassword: hashPassword(input.password) });
  }

  async updateRegistrationID(input: UserFcmDto, payload: JwtPayload): Promise<UserProfile> {
    const [user, session] = await Promise.all([
      this.userService.findById(payload.sub),
      this.sessionService.findByTokenId(payload.jti),
    ]);
    await this.sessionService.update(session._id, { registrationId: input.registrationId });
    return user;
  }

  async revokedMe(payload: JwtPayload): Promise<UserLogoutDto> {
    const session = await this.sessionService.findByTokenId(payload.jti);
    if (session) {
      await this.sessionService.update(session._id, { status: SessionStatus.DISABLED, revokedAt: new Date() });
    }
    return { success: true };
  }

  async revokedOther(tokenIds: string[], payload: JwtPayload): Promise<UserLogoutDto> {
    const filterTokens = tokenIds.filter(jti => jti !== payload.jti);
    const sessions = await this.sessionService.find({ condition: { tokenId: { $in: filterTokens } } });
    if (sessions.length) {
      await Promise.all(
        sessions.map(session =>
          this.sessionService.update(session._id, { status: SessionStatus.DISABLED, revokedAt: new Date() }),
        ),
      );
    }
    return { success: true };
  }
}
