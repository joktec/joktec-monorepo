import { CoreModule, Module, Global } from '@baotg/core';
import { MinioService } from './minio.service';

@Global()
@Module({
  imports: [CoreModule],
  providers: [MinioService],
  exports: [MinioService],
})
export class MinioModule {}
