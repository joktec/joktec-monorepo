import { ApiProperty, ApiPropertyOptional, IsOptional } from '@joktec/core';
import { prop, Schema } from '@joktec/mongo';
import { IsCdnUrl } from '../../../utils';

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class OrderTimeline {
  @prop({ required: true, trim: true })
  @IsOptional()
  @ApiProperty({ example: 'pending' })
  title!: string;

  @prop({ trim: true, default: '' })
  @IsOptional()
  @ApiPropertyOptional({ example: 'pending' })
  subhead?: string;

  @prop({ trim: true })
  @IsOptional()
  @IsCdnUrl({ message: 'LINK_INVALID' })
  @ApiPropertyOptional({ example: 'https://example.com/image.png' })
  link?: string;
}
