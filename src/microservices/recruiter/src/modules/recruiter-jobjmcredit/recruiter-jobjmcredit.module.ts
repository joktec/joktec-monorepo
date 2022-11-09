import {
  RecruiterJobjmcredit,
  RecruiterJobjmcreditSchema,
} from './schemas/recruiter-jobjmcredit.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { RecruiterJobjmcreditService } from './recruiter-jobjmcredit.service';
import { RecruiterJobjmcreditController } from './recruiter-jobjmcredit.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RecruiterJobjmcredit.name,
        schema: RecruiterJobjmcreditSchema,
      },
    ]),
  ],
  controllers: [RecruiterJobjmcreditController],
  providers: [RecruiterJobjmcreditService],
})
export class RecruiterJobjmcreditModule {}
