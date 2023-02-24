import { Column, Model, PrimaryKey, Table } from '@joktec/mysql';

@Table
export class Product extends Model<Product> {
  @PrimaryKey
  id: string;

  @Column
  name: string;
}
