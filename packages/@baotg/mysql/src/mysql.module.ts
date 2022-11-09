import { Module, Global, CoreModule } from '@jobhopin/core';
import { MysqlService } from './mysql.service';

@Global()
@Module({
  imports: [CoreModule],
  providers: [MysqlService],
  exports: [MysqlService],
})
export class MysqlModule {}
