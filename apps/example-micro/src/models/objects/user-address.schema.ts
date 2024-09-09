import { Prop, Schema } from '@joktec/mongo';
import { Address } from '../common';
import { UserAddressType } from '../constants';

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class UserAddress extends Address {
  @Prop({ required: true, enum: UserAddressType, default: UserAddressType.HOME, example: UserAddressType.HOME })
  type!: UserAddressType;

  @Prop({ default: null, example: 'Home' })
  name?: string;

  @Prop({ default: null })
  countryCode?: string;

  @Prop({ default: null })
  phone?: string;

  @Prop({ required: true, default: false })
  isDefault!: boolean;
}
