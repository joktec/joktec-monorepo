import { Injectable } from '@joktec/core';
import { MysqlRepo, MysqlService } from '@joktec/mysql';
import { Product } from './product';

@Injectable()
export class ProductRepo extends MysqlRepo<Product, string> {
  constructor(protected mysqlService: MysqlService) {
    super(mysqlService, Product);
  }
}
