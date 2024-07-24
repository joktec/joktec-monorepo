import { Prop, Schema } from '@joktec/mongo';
import { BaseSchema } from '../../base/base.schema';
import { IsCdnUrl } from '../../utils';
import { UserGender, UserRole, UserStatus } from '../constants';
import { Address } from './address';

@Schema({ collection: 'users', textSearch: 'fullName,phone,email', unique: ['email', 'phone'], paranoid: true })
export class User extends BaseSchema {
  @Prop({ required: true })
  fullName!: string;

  @Prop({ required: true, isPhone: { locale: 'vi-VN' } })
  phone!: string;

  @Prop({ trim: true, lowercase: true, default: null, isEmail: true })
  email?: string;

  @Prop({ trim: true, immutable: true })
  googleId?: string;

  @Prop({ trim: true, immutable: true })
  facebookId?: string;

  @Prop({ exclude: true })
  hashPassword!: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.USER })
  role!: UserRole;

  @Prop({ addNullToEnum: true, enum: UserGender, default: UserGender.UNKNOWN })
  gender?: UserGender;

  @Prop({ default: null })
  birthday?: Date;

  @Prop({ default: null })
  address?: Address;

  @Prop({ default: null })
  @IsCdnUrl()
  image?: string;

  @Prop({ default: null })
  @IsCdnUrl()
  thumbnail?: string;

  @Prop({ required: true, enum: UserStatus, default: UserStatus.PENDING })
  status!: UserStatus;
}
