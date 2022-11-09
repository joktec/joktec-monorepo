import { JobMatch, JobMatchSchema } from './schemas/jobmatch.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobMatchService } from './jobmatch.service';
import { JobMatchController } from './jobmatch.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobMatch.name,
        schema: JobMatchSchema,
      },
    ]),
  ],
  controllers: [JobMatchController],
  providers: [JobMatchService],
})
export class JobMatchModule {}
