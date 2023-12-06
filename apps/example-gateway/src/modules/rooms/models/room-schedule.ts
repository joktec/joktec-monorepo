import { ApiProperty, IsDate, IsMongoId, IsNotEmpty, Type } from '@joktec/core';
import { Prop, Schema } from '@joktec/mongo';

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class RoomSchedule {
  @Prop({ required: true })
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  orderId!: string;

  @Prop({ required: true })
  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  fromDate!: Date;

  @Prop({ required: true })
  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  toDate!: Date;
}
