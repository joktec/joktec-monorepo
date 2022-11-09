import { Module } from '@nestjs/common';
import { CvIndustryService } from './cv-industry.service';
import { CvIndustryController } from './cv-industry.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CvIndustry,
  CvIndustrySchema,
} from './schemas/cv-industry.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CvIndustry.name, schema: CvIndustrySchema },
    ]),
  ],
  controllers: [CvIndustryController],
  providers: [CvIndustryService]
})
export class CvIndustryModule {}
