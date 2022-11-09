import { Module } from '@nestjs/common';
import { CandidateLocationService } from './candidate-location.service';
import { CandidateLocationController } from './candidate-location.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CandidateLocation,
  CandidateLocationSchema,
} from './schemas/candidate-location.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CandidateLocation.name, schema: CandidateLocationSchema },
    ]),
  ],
  controllers: [CandidateLocationController],
  providers: [CandidateLocationService],
})
export class CandidateLocationModule {}
