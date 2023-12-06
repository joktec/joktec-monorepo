import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
  Exclude,
  hashPassword,
  IsDate,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  Type,
  ValidateNested,
} from '@joktec/core';
import { MongoSchema, Prop, Schema } from '@joktec/mongo';
import moment from 'moment';
import { Factory } from 'nestjs-seeder';
import { IsCdnUrl } from '../../../utils';
import { Address } from './address';
import { UserGender, UserRole, UserStatus } from './user.enum';

@Schema({ collection: 'users', textSearch: 'fullName,phone,email', unique: ['email', 'phone'], paranoid: true })
export class User extends MongoSchema {
  @Prop({ required: true })
  @IsNotEmpty({ message: 'FULL_NAME_REQUIRED' })
  @ApiProperty({ example: 'John Doe' })
  @Factory(faker => faker.name.fullName())
  fullName!: string;

  @Prop({ required: true })
  @IsNotEmpty({ message: 'PHONE_REQUIRED' })
  @IsMobilePhone('vi-VN', { strictMode: true }, { message: 'PHONE_INVALID' })
  @ApiProperty({ required: true })
  @Factory(faker => faker.phone.number('+849########'))
  phone!: string;

  @Prop({ trim: true, lowercase: true, default: null })
  @IsOptional()
  @IsEmail({}, { message: 'EMAIL_INVALID' })
  @ApiPropertyOptional()
  @Factory(faker => faker.internet.email())
  email?: string;

  @Prop({ trim: true, immutable: true })
  @IsOptional()
  @ApiPropertyOptional()
  googleId?: string;

  @Prop({ trim: true, immutable: true })
  @IsOptional()
  @ApiPropertyOptional()
  facebookId?: string;

  @Prop({})
  @Exclude({ toPlainOnly: true })
  @IsOptional()
  @ApiHideProperty()
  @Factory(() => hashPassword('simplePass123'))
  hashPassword!: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.USER })
  @IsNotEmpty({ message: 'USER_ROLE_REQUIRED' })
  @IsEnum(UserRole, { message: 'USER_ROLE_INVALID' })
  @ApiProperty({ enum: UserRole })
  @Factory(UserRole.ADMIN)
  role!: UserRole;

  @Prop({ addNullToEnum: true, enum: UserGender, default: UserGender.UNKNOWN })
  @IsOptional()
  @IsEnum(UserGender, { message: 'GENDER_INVALID' })
  @ApiPropertyOptional({ enum: UserGender })
  @Factory(faker => faker.helpers.arrayElement(Object.values(UserGender)))
  gender?: UserGender;

  @Prop({ default: moment().startOf('year').toDate() })
  @Type(() => Date)
  @IsOptional()
  @IsDate({ message: 'BIRTHDAY_INVALID' })
  @ApiPropertyOptional()
  @Factory(faker => faker.date.birthdate())
  birthday?: Date;

  @Prop({ type: Address, default: new Address() })
  @Type(() => Address)
  @IsOptional()
  @ValidateNested()
  @ApiPropertyOptional({ type: Address })
  address?: Address;

  @Prop({ default: '' })
  @IsOptional()
  @IsCdnUrl({ message: 'LINK_INVALID' })
  @ApiPropertyOptional()
  @Factory(faker => faker.image.avatar())
  image?: string;

  @Prop({ default: '' })
  @IsOptional()
  @IsCdnUrl({ message: 'LINK_INVALID' })
  @ApiPropertyOptional()
  @Factory(faker => faker.image.avatar())
  thumbnail?: string;

  @Prop({ required: true, enum: UserStatus, default: UserStatus.PENDING })
  @IsNotEmpty({ message: 'STATUS_REQUIRED' })
  @IsEnum(UserStatus, { message: 'STATUS_INVALID' })
  @ApiProperty({ enum: UserStatus, example: UserStatus.PENDING })
  @Factory(UserStatus.ACTIVATED)
  status!: UserStatus;
}
