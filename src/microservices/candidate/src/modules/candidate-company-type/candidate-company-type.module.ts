import { Module } from '@nestjs/common';
import { CandidateCompanyTypeService } from './candidate-company-type.service';
import { CandidateCompanyTypeController } from './candidate-company-type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CandidateCompanyType,
  CandidateCompanyTypeSchema,
} from './schemas/candidate-company-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CandidateCompanyType.name, schema: CandidateCompanyTypeSchema },
    ]),
  ],
  controllers: [CandidateCompanyTypeController],
  providers: [CandidateCompanyTypeService],
})
export class CandidateCompanyTypeModule {}
