import { Module } from '@nestjs/common';
import { CvTemplatesService } from './cv-templates.service';
import { CvTemplatesController } from './cv-templates.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CvTemplates,
  CvTemplatesSchema,
} from './schemas/cv-templates.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CvTemplates.name, schema: CvTemplatesSchema },
    ]),
  ],
  controllers: [CvTemplatesController],
  providers: [CvTemplatesService]
})
export class CvTemplatesModule {}
