import {
  JobMatchPageVideolink,
  JobMatchPageVideolinkSchema,
} from './schemas/jobmatch-page-videolink.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobMatchPageVideolinkService } from './jobmatch-page-videolink.service';
import { JobMatchPageVideolinkController } from './jobmatch-page-videolink.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobMatchPageVideolink.name,
        schema: JobMatchPageVideolinkSchema,
      },
    ]),
  ],
  controllers: [JobMatchPageVideolinkController],
  providers: [JobMatchPageVideolinkService],
})
export class JobMatchPageVideolinkModule {}
