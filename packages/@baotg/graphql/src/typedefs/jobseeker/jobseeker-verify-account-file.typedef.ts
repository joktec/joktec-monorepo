import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeekerVerifyAccountFile extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  jobseekerId!: string;

  @Field(() => String, {
    nullable: true,
  })
  file!: string;

  @Field(() => Int, {
    nullable: true,
  })
  fileSize!: number;

  @Field(() => String, {
    nullable: true,
  })
  fileName!: string;

  @Field(() => String, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  contentType!: string;

  @Field(() => Int, {
    nullable: true,
  })
  verifyAccountId!: number;

  @Field(() => String, {
    nullable: true,
  })
  fileKey!: string;
}

@ObjectType()
export class JobSeekerVerifyAccountFileDetail extends JobSeekerVerifyAccountFile {}

@ObjectType()
export class JobSeekerVerifyAccountFileListReponse extends BaseListResponse({
  viewDto: JobSeekerVerifyAccountFile,
}) {}
