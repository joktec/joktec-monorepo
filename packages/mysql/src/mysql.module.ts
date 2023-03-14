import { Global, Module } from '@joktec/core';
import { MysqlService } from './mysql.service';

@Global()
@Module({
  imports: [],
  providers: [MysqlService],
  exports: [MysqlService],
})
export class MysqlModule {}
