import { Body } from '@nestjs/common';
import { BaseDto, BaseListResponseDto } from '../dtos/base.dto';
import { BaseConditionInput, BaseCreateInput, BasePaginationInput, BaseQueryInput, BaseUpdateInput } from '../inputs';

export interface IBaseController<
  VIEWDTO extends BaseDto,
  CREATEINPUT extends BaseCreateInput,
  UPDATEINPUT extends BaseUpdateInput,
  LIST_QUERY_INPUT extends BaseQueryInput<BaseConditionInput, BasePaginationInput>,
  LIST_RESPONSE_DTO extends BaseListResponseDto<BaseDto>,
> {
  list(query: LIST_QUERY_INPUT): Promise<LIST_RESPONSE_DTO>;
  get(id: string): Promise<VIEWDTO>;
  create(input: CREATEINPUT): Promise<VIEWDTO>;
  update(input: UPDATEINPUT, id: string): Promise<VIEWDTO>;
  delete(id: string): Promise<VIEWDTO>;
}
