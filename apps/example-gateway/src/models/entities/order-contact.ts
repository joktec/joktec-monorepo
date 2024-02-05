import { Prop, Schema } from '@joktec/mongo';
import { Address } from './address';

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class OrderContact {
  @Prop({ required: true, example: 'John Doe' })
  fullName!: string;

  @Prop({ required: true, isPhone: { locale: 'vi-VN' } })
  phone!: string;

  @Prop({ type: Address, default: new Address() })
  address?: Address;
}
