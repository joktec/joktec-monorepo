import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobLikeService } from './job-like.service';
import { JobLikeController } from './job-like.controller';
import { JobLike, JobLikeSchema } from './schemas/job-like.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: JobLike.name, schema: JobLikeSchema }]),
  ],
  controllers: [JobLikeController],
  providers: [JobLikeService],
})
export class JobLikeModule {}
