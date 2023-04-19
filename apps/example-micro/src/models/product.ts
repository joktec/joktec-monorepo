import { ApiProperty, generateUUID } from '@joktec/core';
import { AllowNull, Column, DataType, Default, Length, MysqlModel, PrimaryKey, Table } from '@joktec/mysql';

@Table({ tableName: 'products', timestamps: true, underscored: true, paranoid: true })
export class Product extends MysqlModel<Product> {
  @PrimaryKey
  @Default(generateUUID)
  @Column(DataType.UUIDV4)
  @ApiProperty({ type: String, example: '0000-0000-0000-0000' })
  id?: string;

  @Length({ min: 10, max: 255, msg: 'NAME_LENGTH_INVALID' })
  @AllowNull(false)
  @Column(DataType.STRING)
  @ApiProperty({ type: String, required: true, example: 'Book' })
  name!: string;

  @Length({ min: 50, max: 255, msg: 'description_LENGTH_INVALID' })
  @Column(DataType.STRING)
  @ApiProperty({ type: String, example: 'Lorem Ipsum' })
  description!: string;
}
