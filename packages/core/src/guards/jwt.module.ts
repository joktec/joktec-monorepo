import { Global, Module } from '@nestjs/common';
import { JwtGuard } from './jwt.guard';
import { JwtService } from './jwt.service';

@Global()
@Module({
  providers: [JwtService, JwtGuard],
  exports: [JwtService, JwtGuard],
})
export class JwtModule {}
