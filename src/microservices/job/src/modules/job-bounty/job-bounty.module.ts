import { JobBounty, JobBountySchema } from './schemas/job-bounty.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobBountyService } from './job-bounty.service';
import { JobBountyController } from './job-bounty.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobBounty.name, schema: JobBountySchema },
    ]),
  ],
  controllers: [JobBountyController],
  providers: [JobBountyService],
})
export class JobBountyModule {}
