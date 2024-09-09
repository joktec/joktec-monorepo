import { BaseService, ICondition, Injectable, plainToInstance } from '@joktec/core';
import { UserStatus } from '../../models/constants';
import { AuthProviderProfile } from '../../models/interfaces';
import { UserProvider } from '../../models/objects';
import { User } from '../../models/schemas';
import { UserRepo } from '../../repositories';

@Injectable()
export class UserService extends BaseService<User, string> {
  constructor(protected userRepo: UserRepo) {
    super(userRepo);
  }

  async getSimpleProfile(id: string) {
    return this.userRepo.findById(id, {
      select: [
        '_id',
        'address',
        'artistIds',
        'avatar',
        'email',
        'nickname',
        'profile',
        'rank',
        'wallet',
        'artists',
        'config',
      ],
      populate: { artists: '*' },
    });
  }

  async findByEmail(email: string): Promise<User> {
    const condition: ICondition<User> = { email };
    return this.userRepo.findOne({ condition });
  }

  async checkExistNickname(nickname: string, email: string): Promise<boolean> {
    const condition: ICondition<User> = { nickname, email: { $ne: email } };
    return !!(await this.userRepo.findOne({ condition }));
  }

  async upsertByProvider(providerProfile: AuthProviderProfile, nickname?: string, avatar?: string): Promise<User> {
    let user = await this.findByEmail(providerProfile.email);
    if (!user) {
      user = await this.userRepo.create({
        email: providerProfile.email,
        nickname: nickname || '',
        avatar: avatar || null,
        status: UserStatus.ACTIVATED,
        providers: [],
      });
    }

    if (user.providers.every(o => o.providerId !== providerProfile.providerId)) {
      const userProvider = plainToInstance(UserProvider, {
        verifiedAt: new Date(),
        type: providerProfile.type,
        providerId: providerProfile.providerId,
        profileName: providerProfile.profileName,
        profileImage: providerProfile.profileImage,
      });
      user = await this.userRepo.update({ _id: user._id }, { $push: { providers: userProvider } });
    }

    return user;
  }
}
