import { hashPassword } from '@joktec/core';
import { MongoSchema, Prop, Schema } from '@joktec/mongo';
import moment from 'moment';
import { Factory } from 'nestjs-seeder';
import { IsCdnUrl } from '../../../utils';
import { Address } from './address';
import { UserGender, UserRole, UserStatus } from './user.enum';

@Schema({ collection: 'users', textSearch: 'fullName,phone,email', unique: ['email', 'phone'], paranoid: true })
export class User extends MongoSchema {
  @Prop({ required: true })
  @Factory(faker => faker.name.fullName())
  fullName!: string;

  @Prop({ required: true, isPhone: { locale: 'vi-VN' } })
  @Factory(faker => faker.phone.number('+849########'))
  phone!: string;

  @Prop({ trim: true, lowercase: true, default: null, isEmail: true })
  @Factory(faker => faker.internet.email())
  email?: string;

  @Prop({ trim: true, immutable: true })
  googleId?: string;

  @Prop({ trim: true, immutable: true })
  facebookId?: string;

  @Prop({ exclude: true })
  @Factory(() => hashPassword('simplePass123'))
  hashPassword!: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.USER })
  @Factory(UserRole.ADMIN)
  role!: UserRole;

  @Prop({ addNullToEnum: true, enum: UserGender, default: UserGender.UNKNOWN })
  @Factory(faker => faker.helpers.arrayElement(Object.values(UserGender)))
  gender?: UserGender;

  @Prop({ type: Date, default: moment().startOf('year').toDate() })
  @Factory(faker => faker.date.birthdate())
  birthday?: Date;

  @Prop({ type: Address, default: new Address() })
  address?: Address;

  @Prop({ default: null })
  @IsCdnUrl({ message: 'LINK_INVALID' })
  @Factory(faker => faker.image.avatar())
  image?: string;

  @Prop({ default: null })
  @IsCdnUrl({ message: 'LINK_INVALID' })
  @Factory(faker => faker.image.avatar())
  thumbnail?: string;

  @Prop({ required: true, enum: UserStatus, default: UserStatus.PENDING })
  @Factory(UserStatus.ACTIVATED)
  status!: UserStatus;
}
