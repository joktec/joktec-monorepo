import { Module, Global, CoreModule } from '@baotg/core';
import { MysqlService } from './mysql.service';

@Global()
@Module({
  imports: [CoreModule],
  providers: [MysqlService],
  exports: [MysqlService],
})
export class MysqlModule {}
