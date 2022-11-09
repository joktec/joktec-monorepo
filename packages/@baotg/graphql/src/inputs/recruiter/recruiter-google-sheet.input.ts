import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DataFormInput {
  @Field(() => String, { nullable: false })
  sheetName: string;

  @Field(() => String, { nullable: true })
  timestamp: string;

  @Field(() => String, { nullable: true })
  keywordSearch: string;

  @Field(() => String, { nullable: true })
  jobTitle: string;

  @Field(() => String, { nullable: true })
  companyName: string;

  @Field(() => String, { nullable: true })
  packageChosen: string;

  @Field(() => String, { nullable: true })
  assignToCS: string;

  @Field(() => String, { nullable: true })
  sql: string;
}
