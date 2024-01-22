import { IsMongoId } from '@joktec/core';
import { Prop, Schema } from '@joktec/mongo';

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class RoomSchedule {
  @Prop({ required: true })
  @IsMongoId()
  orderId!: string;

  @Prop({ type: Date, required: true })
  fromDate!: Date;

  @Prop({ type: Date, required: true })
  toDate!: Date;
}
