import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobhopUserManual extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  manualEn: string;

  @Field(() => String, {
    nullable: true,
  })
  manualVi: string;

  @Field(() => String, {
    nullable: true,
  })
  url: string;
}

@ObjectType()
export class JobhopUserManualDetail extends JobhopUserManual {}

@ObjectType()
export class JobhopUserManualListResponse extends BaseListResponse({
  viewDto: JobhopUserManual,
}) {}
