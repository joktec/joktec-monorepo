import {
  JobhopJobDefaultImage,
  JobhopJobDefaultImageSchema,
} from './schemas/jobhop-jobdefaultimage.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobhopJobDefaultImageService } from './jobhop-jobdefaultimage.service';
import { JobhopJobDefaultImageController } from './jobhop-jobdefaultimage.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobhopJobDefaultImage.name,
        schema: JobhopJobDefaultImageSchema,
      },
    ]),
  ],
  controllers: [JobhopJobDefaultImageController],
  providers: [JobhopJobDefaultImageService],
})
export class JobhopJobDefaultImageModule {}
