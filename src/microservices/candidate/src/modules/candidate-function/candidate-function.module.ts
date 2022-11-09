import { Module } from '@nestjs/common';
import { CandidateFunctionService } from './candidate-function.service';
import { CandidateFunctionController } from './candidate-function.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CandidateFunction,
  CandidateFunctionSchema,
} from './schemas/candidate-function.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CandidateFunction.name, schema: CandidateFunctionSchema },
    ]),
  ],
  controllers: [CandidateFunctionController],
  providers: [CandidateFunctionService],
})
export class CandidateFunctionModule {}
