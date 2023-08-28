import {
  ApiProperty,
  ApiPropertyOptional,
  IsMobilePhone,
  isMobilePhone,
  IsNotEmpty,
  IsOptional,
  Type,
  ValidateNested,
} from '@joktec/core';
import { modelOptions, prop } from '@joktec/mongo';
import { Address } from '../../users';

@modelOptions({ schemaOptions: { _id: false, timestamps: false } })
export class OrderContact {
  @prop({ required: true })
  @IsNotEmpty({ message: 'FULL_NAME_REQUIRED' })
  @ApiProperty({ example: 'John Doe' })
  fullName!: string;

  @prop({ required: true, validate: (v: string) => isMobilePhone(v, 'vi-VN') })
  @IsNotEmpty({ message: 'PHONE_REQUIRED' })
  @IsMobilePhone('vi-VN', { strictMode: true }, { message: 'PHONE_INVALID' })
  @ApiProperty({ required: true })
  phone!: string;

  @prop({ type: Address, default: new Address() })
  @Type(() => Address)
  @IsOptional()
  @ValidateNested()
  @ApiPropertyOptional({ type: Address })
  address?: Address;
}
