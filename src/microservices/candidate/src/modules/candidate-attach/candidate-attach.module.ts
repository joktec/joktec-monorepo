import { Module } from '@nestjs/common';
import { CandidateAttachService } from './candidate-attach.service';
import { CandidateAttachController } from './candidate-attach.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CandidateAttach,
  CandidateAttachSchema,
} from './schemas/candidate-attach.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CandidateAttach.name, schema: CandidateAttachSchema },
    ]),
  ],
  controllers: [CandidateAttachController],
  providers: [CandidateAttachService],
})
export class CandidateAttachModule {}
