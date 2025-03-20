import { ApiPropertyOptional } from '@joktec/core';
import { Prop, Schema } from '@joktec/mongo';
import { Expose, isNotEmpty } from '@joktec/utils';

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class Address {
  @Prop({ default: null, example: '123 Nam Kỳ Khởi Nghĩa' })
  addressLine1?: string;

  @Prop({ default: null, example: 'Lầu 4, Phòng 5' })
  addressLine2?: string;

  @Prop({ default: null, example: 'Phường 7' })
  ward?: string;

  @Prop({ default: null, example: 'Quận 3' })
  district?: string;

  @Prop({ default: null, example: 'Hồ Chí Minh' })
  city?: string;

  @Prop({ default: null, example: 'Hồ Chí Minh' })
  state?: string;

  @Prop({ default: null, example: '700000' })
  postal?: string;

  @Prop({ default: null, example: 'Việt Nam' })
  country?: string;

  @Expose({ toPlainOnly: true })
  @ApiPropertyOptional({ example: '123 Nam Kỳ Khởi Nghĩa, Phường 7, Quận 3, Hồ Chí Minh' })
  get fullAddress(): string {
    return [
      this.addressLine1,
      this.addressLine2,
      this.ward,
      this.district,
      this.city,
      this.state,
      this.postal,
      this.country,
    ]
      .filter(isNotEmpty)
      .join(', ');
  }
}
