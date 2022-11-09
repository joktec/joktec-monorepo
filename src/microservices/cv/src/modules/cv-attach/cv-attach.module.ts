import { Module } from '@nestjs/common';
import { CvAttachService } from './cv-attach.service';
import { CvAttachController } from './cv-attach.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CvAttach,
  CvAttachSchema,
} from './schemas/cv-attach.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CvAttach.name, schema: CvAttachSchema },
    ]),
  ],
  controllers: [CvAttachController],
  providers: [CvAttachService]
})
export class CvAttachModule {}
