import { BaseDto, BaseListResponseDto } from '../base.dto';

export class DepartmentDto extends BaseDto {
  readonly name?: string;
  readonly nameEng?: string;
  readonly priority?: number;

  // * Migration fields
  readonly departmentId?: string;
}

export class DepartmentListResponseDto extends BaseListResponseDto<DepartmentDto> {}
