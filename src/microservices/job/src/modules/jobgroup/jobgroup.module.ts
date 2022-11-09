import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobGroupService } from './jobgroup.service';
import { JobGroupController } from './jobgroup.controller';
import { JobGroup, JobGroupSchema } from './schemas/jobgroup.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobGroup.name,
        schema: JobGroupSchema,
      },
    ]),
  ],
  controllers: [JobGroupController],
  providers: [JobGroupService],
})
export class JobGroupModule {}
