import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseCvMailBoxInput {
  @Field(() => String, {
    nullable: true,
  })
  messageId!: string;

  @Field(() => String, {
    nullable: true,
  })
  eventId!: string;

  @Field(() => String, {
    nullable: true,
  })
  domain!: string;

  @Field(() => String, {
    nullable: true,
  })
  sender!: string;

  @Field(() => String, {
    nullable: true,
  })
  targetEmail!: string;

  @Field(() => String, {
    nullable: true,
  })
  fileName!: string;

  @Field(() => String, {
    nullable: true,
  })
  contentType!: string;

  @Field(() => Int, {
    nullable: true,
  })
  fileSize!: number;

  @Field(() => Date, {
    nullable: true,
  })
  timestamp!: Date;

  @Field(() => String, {
    nullable: true,
  })
  storageUrl!: string;

  @Field(() => String, {
    nullable: true,
  })
  strongeKey!: string;

  @Field(() => String, {
    nullable: true,
  })
  cvId!: string;
}

@InputType()
export class CreateCvMailBoxInput extends BaseCvMailBoxInput {}

@InputType()
export class UpdateCvMailBoxInput extends BaseCvMailBoxInput {
  @Field()
  id!: string;
}

@InputType()
export class CvMailBoxPaginationInput extends BasePaginationInput {}

@InputType()
export class CvMailBoxConditionInput extends BaseConditionInput {}

@InputType()
export class CvMailBoxQueryInput extends BaseQueryInput({
  conditionInput: CvMailBoxConditionInput,
  paginationInput: CvMailBoxPaginationInput,
})<CvMailBoxConditionInput, CvMailBoxPaginationInput> {}
