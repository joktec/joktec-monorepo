import { Module } from '@nestjs/common';
import { CvAnalysicFlowService } from './cv-analysic-flow.service';
import { CvAnalysicFlowController } from './cv-analysic-flow.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CvAnalysicFlow,
  CvAnalysicFlowSchema,
} from './schemas/cv-analysic-flow.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CvAnalysicFlow.name, schema: CvAnalysicFlowSchema },
    ]),
  ],
  controllers: [CvAnalysicFlowController],
  providers: [CvAnalysicFlowService]
})
export class CvAnalysicFlowModule {}
