import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseCvSkillInput {
  @Field(() => String, {
    nullable: true,
  })
  lastUpdate!: string;

  @Field(() => String, {
    nullable: true,
  })
  updatedBy!: string;

  @Field(() => String, {
    nullable: true,
  })
  cvId!: string;

  @Field(() => String, {
    nullable: true,
  })
  nameSkill!: string;

  @Field(() => String, {
    nullable: true,
  })
  skillId!: string;
}

@InputType()
export class CreateCvSkillInput extends BaseCvSkillInput {}

@InputType()
export class UpdateCvSkillInput extends BaseCvSkillInput {
  @Field()
  id!: string;
}

@InputType()
export class CvSkillPaginationInput extends BasePaginationInput {}

@InputType()
export class CvSkillConditionInput extends BaseConditionInput {}

@InputType()
export class CvSkillQueryInput extends BaseQueryInput({
  conditionInput: CvSkillConditionInput,
  paginationInput: CvSkillPaginationInput,
})<CvSkillConditionInput, CvSkillPaginationInput> {}
