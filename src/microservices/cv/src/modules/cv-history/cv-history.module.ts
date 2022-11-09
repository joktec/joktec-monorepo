import { Module } from '@nestjs/common';
import { CvHistoryService } from './cv-history.service';
import { CvHistoryController } from './cv-history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CvHistory,
  CvHistorySchema,
} from './schemas/cv-history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CvHistory.name, schema: CvHistorySchema },
    ]),
  ],
  controllers: [CvHistoryController],
  providers: [CvHistoryService]
})
export class CvHistoryModule {}
