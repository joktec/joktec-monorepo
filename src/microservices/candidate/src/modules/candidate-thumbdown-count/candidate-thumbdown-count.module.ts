import { Module } from '@nestjs/common';
import { CandidateThumbdownCountService } from './candidate-thumbdown-count.service';
import { CandidateThumbdownCountController } from './candidate-thumbdown-count.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CandidateThumbdownCount,
  CandidateThumbdownCountSchema,
} from './schemas/candidate-thumbdown-count.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CandidateThumbdownCount.name,
        schema: CandidateThumbdownCountSchema,
      },
    ]),
  ],
  controllers: [CandidateThumbdownCountController],
  providers: [CandidateThumbdownCountService],
})
export class CandidateThumbdownCountModule {}
