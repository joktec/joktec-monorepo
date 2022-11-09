import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { RecruiterJobjmcreditlogService } from './recruiter-jobjmcreditlog.service';
import { RecruiterJobjmcreditlogController } from './recruiter-jobjmcreditlog.controller';
import {
  RecruiterJobjmcreditlog,
  RecruiterJobjmcreditlogSchema,
} from './schemas/recruiter-jobjmcreditlog.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RecruiterJobjmcreditlog.name,
        schema: RecruiterJobjmcreditlogSchema,
      },
    ]),
  ],
  controllers: [RecruiterJobjmcreditlogController],
  providers: [RecruiterJobjmcreditlogService],
})
export class RecruiterJobjmcreditlogModule {}
