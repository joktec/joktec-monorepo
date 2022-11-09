import { Module } from '@nestjs/common';
import { InterviewerService } from './interviewer.service';
import { InterviewerController } from './interviewer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Interviewer, InterviewerSchema } from './schemas/interviewer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Interviewer.name, schema: InterviewerSchema }]),
  ],
  controllers: [InterviewerController],
  providers: [InterviewerService]
})
export class InterviewerModule {}
