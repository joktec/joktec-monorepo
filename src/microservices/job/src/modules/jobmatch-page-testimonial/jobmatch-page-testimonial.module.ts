import {
  JobMatchPageTestimonial,
  JobMatchPageTestimonialSchema,
} from './schemas/jobmatch-page-testimonial.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobMatchPageTestimonialService } from './jobmatch-page-testimonial.service';
import { JobMatchPageTestimonialController } from './jobmatch-page-testimonial.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobMatchPageTestimonial.name,
        schema: JobMatchPageTestimonialSchema,
      },
    ]),
  ],
  controllers: [JobMatchPageTestimonialController],
  providers: [JobMatchPageTestimonialService],
})
export class JobMatchPageTestimonialModule {}
