import { Module } from '@nestjs/common';
import { CvScoreService } from './cv-score.service';
import { CvScoreController } from './cv-score.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CvScore, CvScoreSchema } from './schemas/cv-score.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CvScore.name, schema: CvScoreSchema },
    ]),
  ],
  controllers: [CvScoreController],
  providers: [CvScoreService]
})
export class CvScoreModule {}
