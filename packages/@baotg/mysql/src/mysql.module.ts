import { Global, Module } from '@baotg/core';
import { MysqlService } from './mysql.service';

@Global()
@Module({
  imports: [],
  providers: [MysqlService],
  exports: [MysqlService],
})
export class MysqlModule {}
