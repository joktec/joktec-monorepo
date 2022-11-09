import { Module } from '@nestjs/common';
import { JobseekerEntityViewService } from './jobseeker_entity_view.service';
import { JobseekerEntityViewController } from './jobseeker_entity_view.controller';

import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerEntityView,
  JobseekerEntityViewSchema,
} from './schemas/jobseeker_entity_view.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerEntityView.name, schema: JobseekerEntityViewSchema },
    ]),
  ],
  controllers: [JobseekerEntityViewController],
  providers: [JobseekerEntityViewService]
})
export class JobseekerEntityViewModule {}
