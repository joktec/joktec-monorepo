import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseCvAttachInput {
  @Field(() => String, {
    nullable: true,
  })
  contentType!: string;

  @Field(() => String, {
    nullable: true,
  })
  cvId!: string;

  @Field(() => String, {
    nullable: true,
  })
  fileSize!: string;

  @Field(() => String, {
    nullable: true,
  })
  link!: string;

  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  lastUpdate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  updateBy!: string;
}

@InputType()
export class CreateCvAttachInput extends BaseCvAttachInput {}

@InputType()
export class UpdateCvAttachInput extends BaseCvAttachInput {
  @Field()
  id!: string;
}

@InputType()
export class CvAttachPaginationInput extends BasePaginationInput {}

@InputType()
export class CvAttachConditionInput extends BaseConditionInput {}

@InputType()
export class CvAttachQueryInput extends BaseQueryInput({
  conditionInput: CvAttachConditionInput,
  paginationInput: CvAttachPaginationInput,
})<CvAttachConditionInput, CvAttachPaginationInput> {}
