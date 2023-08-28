import { BaseService, ICondition, Injectable, NotImplementedException } from '@joktec/core';
import { AuthPlatform, User, UserRole, UserStatus } from './models';
import { UserRepo } from './user.repo';

@Injectable()
export class UserService extends BaseService<User, string> {
  constructor(protected userRepo: UserRepo) {
    super(userRepo);
  }

  async findByPhone(phone: string): Promise<User> {
    return this.userRepo.findOne({ condition: { phone } });
  }

  async findByEmail(email: string, notUserId?: string): Promise<User> {
    const condition: ICondition<User> = { email };
    if (notUserId) condition._id = { $ne: notUserId };
    return this.userRepo.findOne({ condition });
  }

  async findByUId(uid: string, platform: AuthPlatform): Promise<User> {
    if (platform === AuthPlatform.GOOGLE) {
      return this.userRepo.findOne({ condition: { $and: [{ googleId: { $exists: true } }, { googleId: uid }] } });
    }
    if (platform === AuthPlatform.FACEBOOK) {
      return this.userRepo.findOne({ condition: { $and: [{ facebookId: { $exists: true } }, { facebookId: uid }] } });
    }
    throw new NotImplementedException('PLATFORM_NOT_SUPPORT_SSO');
  }

  async forceDelete(id: string): Promise<boolean> {
    await this.userRepo.delete({ _id: id }, { force: true });
    return true;
  }

  async findAllAdmin(): Promise<User[]> {
    return this.userRepo.find({ condition: { role: UserRole.ADMIN, status: UserStatus.ACTIVATED } });
  }

  async findAllUser(): Promise<User[]> {
    return this.userRepo.find({ condition: { role: UserRole.USER, status: UserStatus.ACTIVATED } });
  }
}
