import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseCvInput {
  @Field(() => String, {
    nullable: true,
  })
  contentType!: string;

  @Field(() => Int, {
    nullable: true,
  })
  deleted!: number;

  @Field(() => String, {
    nullable: true,
  })
  email!: string;

  @Field(() => String, {
    nullable: true,
  })
  experience!: string;

  @Field(() => Int, {
    nullable: true,
  })
  fullSize!: number;

  @Field(() => String, {
    nullable: true,
  })
  fullName!: string;

  @Field(() => Int, {
    nullable: true,
  })
  gender!: number;

  @Field(() => String, {
    nullable: true,
  })
  htmlData!: string;

  @Field(() => String, {
    nullable: true,
  })
  industries!: string;

  @Field(() => String, {
    nullable: true,
  })
  link!: string;

  @Field(() => String, {
    nullable: true,
  })
  inputLink!: string;

  @Field(() => String, {
    nullable: true,
  })
  location!: string;

  @Field(() => String, {
    nullable: true,
  })
  nameFile!: string;

  @Field(() => String, {
    nullable: true,
  })
  notes!: string;

  @Field(() => String, {
    nullable: true,
  })
  phone!: string;

  @Field(() => String, {
    nullable: true,
  })
  position!: string;

  @Field(() => String, {
    nullable: true,
  })
  salary!: number;

  @Field(() => String, {
    nullable: true,
  })
  skill!: string;

  @Field(() => String, {
    nullable: true,
  })
  source!: string;

  @Field(() => String, {
    nullable: true,
  })
  status!: string;

  @Field(() => String, {
    nullable: true,
  })
  txtData!: string;

  @Field(() => String, {
    nullable: true,
  })
  userName!: string;

  @Field(() => String, {
    nullable: true,
  })
  birthday!: Date;

  @Field(() => String, {
    nullable: true,
  })
  referalLink!: string;

  @Field(() => String, {
    nullable: true,
  })
  tags!: string;

  @Field(() => String, {
    nullable: true,
  })
  description!: string;

  @Field(() => String, {
    nullable: true,
  })
  usernameType!: string;

  @Field(() => String, {
    nullable: true,
  })
  jsId!: string;

  @Field(() => String, {
    nullable: true,
  })
  jsType!: string;

  @Field(() => String, {
    nullable: true,
  })
  createByType!: string;

  @Field(() => String, {
    nullable: true,
  })
  firstName!: string;

  @Field(() => String, {
    nullable: true,
  })
  lastName!: string;

  @Field(() => Int, {
    nullable: true,
  })
  private!: number;

  @Field(() => Int, {
    nullable: true,
  })
  isPicked!: number;

  @Field(() => String, {
    nullable: true,
  })
  linkCvRedacted!: string;

  @Field(() => String, {
    nullable: true,
  })
  ranking!: string;

  @Field(() => String, {
    nullable: true,
  })
  marketValueCurrency!: string;

  @Field(() => String, {
    nullable: true,
  })
  expectedSalaryCurrency!: string;

  @Field(() => Int, {
    nullable: true,
  })
  functionId!: number;

  @Field(() => Int, {
    nullable: true,
  })
  marketValue!: number;

  @Field(() => String, {
    nullable: true,
  })
  uploadedAvatar!: string;

  @Field(() => String, {
    nullable: true,
  })
  functions!: string;

  @Field(() => Int, {
    nullable: true,
  })
  totalPool!: number;

  @Field(() => Int, {
    nullable: true,
  })
  topCv!: number;

  @Field(() => String, {
    nullable: true,
  })
  analysis!: string;

  @Field(() => Int, {
    nullable: true,
  })
  marketValueAi!: number;

  @Field(() => String, {
    nullable: true,
  })
  jobTitle!: string;

  @Field(() => String, {
    nullable: true,
  })
  companyTypes!: string;

  @Field(() => Int, {
    nullable: true,
  })
  expectedSalary!: number;

  @Field(() => String, {
    nullable: true,
  })
  locations!: string;

  @Field(() => Int, {
    nullable: true,
  })
  localtionId!: number;

  @Field(() => String, {
    nullable: true,
  })
  acContactId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  isTopCv!: number;

  @Field(() => Int, {
    nullable: true,
  })
  isTpSetPrivate!: number;

  @Field(() => Int, {
    nullable: true,
  })
  platform!: number;

  @Field(() => Date, {
    nullable: true,
  })
  hopin!: Date;

  @Field(() => String, {
    nullable: true,
  })
  referalLinkAi!: string;

  @Field(() => Date, {
    nullable: true,
  })
  lastUpdate!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  updateBy!: Date;

  @Field(() => String, {
    nullable: true,
  })
  createBy!: string;

  @Field(() => Date, {
    nullable: true,
  })
  createDate!: Date;
}

@InputType()
export class CreateCvInput extends BaseCvInput {}

@InputType()
export class UpdateCvInput extends BaseCvInput {
  @Field()
  id!: string;
}

@InputType()
export class CvPaginationInput extends BasePaginationInput {}

@InputType()
export class CvConditionInput extends BaseConditionInput {}

@InputType()
export class CvQueryInput extends BaseQueryInput({
  conditionInput: CvConditionInput,
  paginationInput: CvPaginationInput,
})<CvConditionInput, CvPaginationInput> {}
