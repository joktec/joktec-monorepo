import { ApiPropertyOptional, Expose } from '@joktec/core';
import { Prop, Schema } from '@joktec/mongo';
import { sum } from 'lodash';

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class UserWallet {
  @Prop({ required: true, default: 0 })
  charge!: number;

  @Prop({ required: true, default: 0 })
  revenue!: number;

  @Prop({ required: true, default: 0 })
  bonus!: number;

  @Prop({ required: true, default: 0 })
  event!: number;

  @Expose({ toPlainOnly: true })
  @ApiPropertyOptional({ example: 9999 })
  public get balance(): number {
    return sum([this.charge, this.revenue, this.bonus, this.event]);
  }
}
