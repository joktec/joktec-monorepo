import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
  Exclude,
  hashPassword,
  IsDate,
  IsEmail,
  isEmail,
  IsEnum,
  isMobilePhone,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  Type,
  ValidateNested,
} from '@joktec/core';
import { MongoSchema, prop, Schema } from '@joktec/mongo';
import moment from 'moment';
import { Factory } from 'nestjs-seeder';
import { IsCdnUrl } from '../../../utils';
import { Address } from './address';
import { UserGender, UserRole, UserStatus } from './user.enum';

@Schema({ collection: 'users', textSearch: ['fullName', 'phone', 'email'] })
export class User extends MongoSchema {
  @prop({ required: true })
  @IsNotEmpty({ message: 'FULL_NAME_REQUIRED' })
  @ApiProperty({ example: 'John Doe' })
  @Factory(faker => faker.name.fullName())
  fullName!: string;

  @prop({ required: true, validate: (v: string) => isMobilePhone(v, 'vi-VN') })
  @IsNotEmpty({ message: 'PHONE_REQUIRED' })
  @IsMobilePhone('vi-VN', { strictMode: true }, { message: 'PHONE_INVALID' })
  @ApiProperty({ required: true })
  @Factory(faker => faker.phone.number('+849########'))
  phone!: string;

  @prop({ trim: true, lowercase: true, validate: isEmail, default: null })
  @IsOptional()
  @IsEmail({}, { message: 'EMAIL_INVALID' })
  @ApiPropertyOptional()
  @Factory(faker => faker.internet.email())
  email?: string;

  @prop({ trim: true, immutable: true })
  @IsOptional()
  @ApiPropertyOptional()
  googleId?: string;

  @prop({ trim: true, immutable: true })
  @IsOptional()
  @ApiPropertyOptional()
  facebookId?: string;

  @prop({})
  @Exclude({ toPlainOnly: true })
  @IsOptional()
  @ApiHideProperty()
  @Factory(() => hashPassword('simplePass123'))
  hashPassword!: string;

  @prop({ required: true, enum: UserRole, default: UserRole.USER })
  @IsNotEmpty({ message: 'USER_ROLE_REQUIRED' })
  @IsEnum(UserRole, { message: 'USER_ROLE_INVALID' })
  @ApiProperty({ enum: UserRole })
  @Factory(UserRole.ADMIN)
  role!: UserRole;

  @prop({ addNullToEnum: true, enum: UserGender, default: UserGender.UNKNOWN })
  @IsOptional()
  @IsEnum(UserGender, { message: 'GENDER_INVALID' })
  @ApiPropertyOptional({ enum: UserGender })
  @Factory(faker => faker.helpers.arrayElement(Object.values(UserGender)))
  gender?: UserGender;

  @prop({ default: moment().startOf('year').toDate() })
  @Type(() => Date)
  @IsOptional()
  @IsDate({ message: 'BIRTHDAY_INVALID' })
  @ApiPropertyOptional()
  @Factory(faker => faker.date.birthdate())
  birthday?: Date;

  @prop({ type: Address, default: new Address() })
  @Type(() => Address)
  @IsOptional()
  @ValidateNested()
  @ApiPropertyOptional({ type: Address })
  address?: Address;

  @prop({ default: '' })
  @IsOptional()
  @IsCdnUrl({ message: 'LINK_INVALID' })
  @ApiPropertyOptional()
  @Factory(faker => faker.image.avatar())
  image?: string;

  @prop({ default: '' })
  @IsOptional()
  @IsCdnUrl({ message: 'LINK_INVALID' })
  @ApiPropertyOptional()
  @Factory(faker => faker.image.avatar())
  thumbnail?: string;

  @prop({ required: true, enum: UserStatus, default: UserStatus.PENDING })
  @IsNotEmpty({ message: 'STATUS_REQUIRED' })
  @IsEnum(UserStatus, { message: 'STATUS_INVALID' })
  @ApiProperty({ enum: UserStatus, example: UserStatus.PENDING })
  @Factory(UserStatus.ACTIVATED)
  status!: UserStatus;
}
