import { generateUUID } from '@joktec/core';
import { AllowNull, Column, DataType, Default, Length, Model, PrimaryKey, Table } from '@joktec/mysql';

@Table({ tableName: 'products', timestamps: true, underscored: true, paranoid: true })
export class Product extends Model<Product> {
  @PrimaryKey
  @Default(generateUUID)
  @Column(DataType.UUIDV4)
  id!: string;

  @Length({ min: 10, max: 255, msg: 'NAME_LENGTH_INVALID' })
  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @Length({ min: 50, max: 255, msg: 'NAME_LENGTH_INVALID' })
  @Column(DataType.STRING)
  description!: string;
}
