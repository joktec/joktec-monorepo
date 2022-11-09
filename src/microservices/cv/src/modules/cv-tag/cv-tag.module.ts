import { Module } from '@nestjs/common';
import { CvTagService } from './cv-tag.service';
import { CvTagController } from './cv-tag.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CvTag,
  CvTagSchema,
} from './schemas/cv-tag.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CvTag.name, schema: CvTagSchema },
    ]),
  ],
  controllers: [CvTagController],
  providers: [CvTagService]
})
export class CvTagModule {}
