import { BaseDto, BaseListResponseDto } from '../base.dto';

export class SkillDto extends BaseDto {
  code!: string;

  name!: string;
}

export class SkillListResponseDto extends BaseListResponseDto<SkillDto> {}
