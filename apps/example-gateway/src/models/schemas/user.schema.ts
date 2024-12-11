import { Expose, linkTransform } from '@joktec/core';
import { ObjectId, Prop, Ref, Schema } from '@joktec/mongo';
import { appConfig } from '../../app.config';
import { IsCdnUrl } from '../../utils';
import { BaseSchema } from '../common';
import { UserRole, UserStatus } from '../constants';
import {
  UserAddress,
  UserBusiness,
  UserConfig,
  UserKeyword,
  UserProfile,
  UserProvider,
  UserRank,
  UserWallet,
} from '../objects';
import { Artist } from './artist.schema';

@Schema({
  collection: 'users',
  textSearch: 'nickname,email,profile.displayName,profile.fullName',
  unique: ['email'],
  index: ['artistIds'],
  paranoid: true,
})
export class User extends BaseSchema {
  @Prop({ default: '' })
  nickname?: string;

  @Prop({ required: true, trim: true, lowercase: true, default: null, isEmail: true, example: 'admin@gmail.com' })
  email!: string;

  @Prop({ hidden: true })
  password?: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.NORMAL })
  role!: UserRole;

  @Prop({ default: null })
  @IsCdnUrl()
  avatar?: string;

  @Expose({ toPlainOnly: true })
  get thumbnail(): string {
    if (!this.avatar) return '';
    const { cdnUrl, resizeUrl } = appConfig.misc;
    const fullUrl = linkTransform(this.avatar, cdnUrl, 'absolute');
    return `${resizeUrl}/width=300,quality=100/${fullUrl}`;
  }

  @Prop({ required: true, enum: UserStatus, default: UserStatus.PENDING })
  status!: UserStatus;

  @Prop({ type: [UserProvider], required: true, minSize: 1 })
  providers!: UserProvider[];

  @Prop({ required: true, default: () => new UserProfile() })
  profile!: UserProfile;

  @Prop({ default: null, example: () => new UserAddress() })
  address?: UserAddress;

  @Prop({ required: true, default: () => new UserWallet() })
  wallet!: UserWallet;

  @Prop({ required: true, default: () => new UserRank() })
  rank!: UserRank;

  @Prop({ default: null })
  business?: UserBusiness;

  @Prop({ type: [UserKeyword], required: true, default: [] })
  keywords?: UserKeyword[];

  @Prop({ type: UserConfig, required: true, default: () => new UserConfig() })
  config?: UserConfig;

  @Prop({ default: null })
  registeredAt?: Date;

  @Prop({ type: [ObjectId], ref: () => Artist, required: true, default: [] })
  artistIds?: Ref<Artist, string>[];

  // Virtual
  @Prop({ type: [Artist], ref: () => Artist, foreignField: '_id', localField: 'artistIds', example: [] })
  artists?: Ref<Artist>[];
}
