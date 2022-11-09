import {
  RecruiterJobjmcreditplan,
  RecruiterJobjmcreditplanSchema,
} from './schemas/recruiter-jobjmcreditplan.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { RecruiterJobjmcreditplanService } from './recruiter-jobjmcreditplan.service';
import { RecruiterJobjmcreditplanController } from './recruiter-jobjmcreditplan.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RecruiterJobjmcreditplan.name,
        schema: RecruiterJobjmcreditplanSchema,
      },
    ]),
  ],
  controllers: [RecruiterJobjmcreditplanController],
  providers: [RecruiterJobjmcreditplanService],
})
export class RecruiterJobjmcreditplanModule {}
