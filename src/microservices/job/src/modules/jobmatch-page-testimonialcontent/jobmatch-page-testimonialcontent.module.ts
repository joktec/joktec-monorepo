import {
  JobMatchPageTestimonialContent,
  JobMatchPageTestimonialContentSchema,
} from './schemas/jobmatch-page-testimonialcontent.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobMatchPageTestimonialContentService } from './jobmatch-page-testimonialcontent.service';
import { JobMatchPageTestimonialContentController } from './jobmatch-page-testimonialcontent.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobMatchPageTestimonialContent.name,
        schema: JobMatchPageTestimonialContentSchema,
      },
    ]),
  ],
  controllers: [JobMatchPageTestimonialContentController],
  providers: [JobMatchPageTestimonialContentService],
})
export class JobMatchPageTestimonialContentModule {}
