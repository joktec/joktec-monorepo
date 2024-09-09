import { Prop, Schema } from '@joktec/mongo';
import { UserBizStatus, UserBizType } from '../constants';

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class UserBusiness {
  @Prop({ required: true, enum: UserBizType, default: UserBizType.DEFAULT })
  type!: UserBizType;

  @Prop({ required: true, enum: UserBizStatus, default: UserBizStatus.WAITING })
  status!: UserBizStatus;

  @Prop({ required: true })
  registration_number!: number;

  @Prop({ required: true })
  business!: string;

  @Prop({ required: true })
  location!: string;

  @Prop({ required: true })
  documentary!: string;

  @Prop({ required: true, default: false })
  recommend_priority!: boolean;

  @Prop({ required: false, isEmail: true })
  email?: string;
}
