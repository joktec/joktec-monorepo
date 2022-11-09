import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
import { EmailService } from './email.service';

@Module({
  // imports: [ConfigModule],
  imports: [],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
