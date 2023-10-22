import { ApiProperty, IsDate, IsMongoId, IsNotEmpty, Type } from '@joktec/core';
import { prop, Schema } from '@joktec/mongo';

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class RoomSchedule {
  @prop({ required: true })
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  orderId!: string;

  @prop({ required: true })
  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  fromDate!: Date;

  @prop({ required: true })
  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  toDate!: Date;
}
