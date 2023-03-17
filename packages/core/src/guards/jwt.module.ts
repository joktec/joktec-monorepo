import { Global, Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JwtGuard } from './jwt.guard';

@Global()
@Module({
  providers: [JwtService, JwtGuard],
})
export class JwtModule {}
