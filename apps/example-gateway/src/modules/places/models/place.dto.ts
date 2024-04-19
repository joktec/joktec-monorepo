import { IBaseRequest, IsBoolean, IsOptional, OmitType, Type } from '@joktec/core';
import { PlaceSchema } from '../../../models/schemas';

export class PlaceQuery implements IBaseRequest<PlaceSchema> {
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  topReviewCount?: boolean;
}

export class PlaceDto extends OmitType(PlaceSchema, ['jsonData', 'htmlData'] as const) {}
