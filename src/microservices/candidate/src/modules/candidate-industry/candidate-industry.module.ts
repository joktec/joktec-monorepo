import { Module } from '@nestjs/common';
import { CandidateIndustryService } from './candidate-industry.service';
import { CandidateIndustryController } from './candidate-industry.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CandidateIndustry,
  CandidateIndustrySchema,
} from './schemas/candidate-industry.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CandidateIndustry.name, schema: CandidateIndustrySchema },
    ]),
  ],
  controllers: [CandidateIndustryController],
  providers: [CandidateIndustryService],
})
export class CandidateIndustryModule {}
