import { ApiProperty, ApiPropertyOptional, Expose, isNotEmpty, IsOptional } from '@joktec/core';
import { modelOptions, prop } from '@joktec/mongo';

@modelOptions({ schemaOptions: { _id: false, timestamps: false } })
export class Address {
  @prop({ default: '' })
  @IsOptional()
  @ApiProperty({ example: '123 Nam Kỳ Khởi Nghĩa' })
  addressLine1?: string;

  @prop({ default: '' })
  @IsOptional()
  @ApiPropertyOptional({ example: 'Lầu 4, Phòng 5' })
  addressLine2?: string;

  @prop({ default: '' })
  @IsOptional()
  @ApiPropertyOptional({ example: 'Phường 7' })
  ward?: string;

  @prop({ default: '' })
  @IsOptional()
  @ApiPropertyOptional({ example: 'Quận 3' })
  district?: string;

  @prop({ default: '' })
  @IsOptional()
  @ApiPropertyOptional({ example: 'Hồ Chí Minh' })
  city?: string;

  @prop({ default: '' })
  @IsOptional()
  @ApiPropertyOptional({ example: 'Hồ Chí Minh' })
  state?: string;

  @prop({ default: '' })
  @IsOptional()
  @ApiPropertyOptional({ example: '700000' })
  postal?: string;

  @prop({ default: '' })
  @IsOptional()
  @ApiPropertyOptional({ example: 'Việt Nam' })
  country?: string;

  @Expose({ toPlainOnly: true })
  @ApiPropertyOptional({ example: '123 Nam Kỳ Khởi Nghĩa, Phường 7, Quận 3, Hồ Chí Minh' })
  public get fullAddress(): string {
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
