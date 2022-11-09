import { Module } from '@nestjs/common';
import { CandidateLinkService } from './candidate-link.service';
import { CandidateLinkController } from './candidate-link.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CandidateLink,
  CandidateLinkSchema,
} from './schemas/candidate-link.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CandidateLink.name, schema: CandidateLinkSchema },
    ]),
  ],
  controllers: [CandidateLinkController],
  providers: [CandidateLinkService],
})
export class CandidateLinkModule {}
