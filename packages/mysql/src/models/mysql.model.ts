import { ApiProperty, Field } from '@joktec/core';
import { CreatedAt, DeletedAt, Model, UpdatedAt } from 'sequelize-typescript';

export abstract class MysqlModel<T> extends Model<T> {
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
