import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobBoardApplyLog extends BaseTypedef {
  @Field(() => String, { nullable: true })
  applyTime: Date;

  @Field(() => String, { nullable: true })
  cvId: string;

  @Field(() => String, { nullable: true })
  cvLink: string;

  @Field(() => String, { nullable: true })
  jobBoard: string;

  @Field(() => String, { nullable: true })
  jobBoardLink: string;

  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => String, { nullable: true })
  jobseekerId: string;

  @Field(() => String, { nullable: true })
  message: string;

  @Field(() => String, { nullable: true })
  screenshotFile: string;

  @Field(() => String, { nullable: true })
  status: string;
}

@ObjectType()
export class JobBoardApplyLogDetail extends JobBoardApplyLog {}

@ObjectType()
export class JobBoardApplyLogListResponse extends BaseListResponse({
  viewDto: JobBoardApplyLog,
}) {}
