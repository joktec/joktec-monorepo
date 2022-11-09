import { Module } from '@nestjs/common';
import { CvLinkService } from './cv-link.service';
import { CvLinkController } from './cv-link.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CvLink,
  CvLinkSchema,
} from './schemas/cv-link.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CvLink.name, schema: CvLinkSchema },
    ]),
  ],
  controllers: [CvLinkController],
  providers: [CvLinkService]
})
export class CvLinkModule {}
