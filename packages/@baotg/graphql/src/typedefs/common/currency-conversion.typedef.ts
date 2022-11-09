import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse } from '../base.typedef';

@ObjectType()
export class VNDConversion {
  @Field(() => Number, {
    nullable: true,
  })
  VND: number;
}

@ObjectType()
export class CurrencyConversion {
  @Field(() => VNDConversion, {
    nullable: true,
  })
  USD: VNDConversion;
}

@ObjectType()
export class CurrencyConversionDetail extends CurrencyConversion {}

@ObjectType()
export class CurrencyConversionListResponse extends BaseListResponse({
  viewDto: CurrencyConversion,
}) {}
