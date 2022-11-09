import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationTypeService } from './location-type.service';
import { LocationTypeController } from './location-type.controller';
import {
  LocationType,
  LocationTypeSchema,
} from './schemas/location-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LocationType.name, schema: LocationTypeSchema },
    ]),
  ],
  providers: [LocationTypeService],
  controllers: [LocationTypeController],
  exports: [LocationTypeService],
})
export class LocationTypeModule {}
