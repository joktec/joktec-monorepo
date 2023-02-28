import { Column, DataType, Length, Model, PrimaryKey, Table } from '@joktec/mysql';

@Table({ tableName: 'products', timestamps: false, paranoid: true })
export class Product extends Model<Product> {
  @PrimaryKey
  @Column(DataType.UUIDV4)
  id!: string;

  @Length({ min: 10, max: 255 })
  @Column(DataType.STRING)
  name!: string;
}
