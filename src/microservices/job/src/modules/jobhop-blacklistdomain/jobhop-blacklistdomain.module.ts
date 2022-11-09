import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobhopBlacklistDomainService } from './jobhop-blacklistdomain.service';
import { JobhopBlacklistDomainController } from './jobhop-blacklistdomain.controller';
import {
  JobhopBlacklistDomain,
  JobhopBlacklistDomainSchema,
} from './schemas/jobhop-blacklistdomain.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobhopBlacklistDomain.name,
        schema: JobhopBlacklistDomainSchema,
      },
    ]),
  ],
  controllers: [JobhopBlacklistDomainController],
  providers: [JobhopBlacklistDomainService],
})
export class JobhopBlacklistDomainModule {}
