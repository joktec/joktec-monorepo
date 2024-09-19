import { ApiProperty, Field } from '@joktec/core';
import { CreatedAt, DeletedAt, Model, UpdatedAt } from 'sequelize-typescript';

export class MysqlModel<
  TModelAttributes extends {} = any,
  TCreationAttributes extends {} = TModelAttributes,
> extends Model<TModelAttributes, TCreationAttributes> {
  id?: number | any;

  @CreatedAt
  @ApiProperty({ type: Date })
  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @UpdatedAt
  @ApiProperty({ type: Date })
  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @DeletedAt
  @ApiProperty({ type: Date })
  @Field(() => Date, { nullable: true })
  deletedAt?: Date;
}
