import { Module } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { InterviewController } from './interview.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Interview, InterviewSchema } from './schemas/interview.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Interview.name, schema: InterviewSchema }]),
  ],
  controllers: [InterviewController],
  providers: [InterviewService]
})
export class InterviewModule {}
