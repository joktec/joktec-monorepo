import { Module } from '@nestjs/common';
import { JobseekerAddressGPlaceService } from './jobseeker_address_g_place.service';
import { JobseekerAddressGPlaceController } from './jobseeker_address_g_place.controller';

import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerAddressGPlace,
  JobseekerAddressGPlaceSchema,
} from './schemas/jobseeker_address_g_place.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerAddressGPlace.name, schema: JobseekerAddressGPlaceSchema },
    ]),
  ],
  controllers: [JobseekerAddressGPlaceController],
  providers: [JobseekerAddressGPlaceService]
})
export class JobseekerAddressGPlaceModule {}
