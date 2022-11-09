import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { Location, LocationSchema } from './schemas/location.schema';
import { LocationTypeModule } from '../location-type';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Location.name, schema: LocationSchema },
    ]),
    forwardRef(() => LocationTypeModule),
  ],
  providers: [LocationService],
  controllers: [LocationController],
  exports: [LocationService],
})
export class LocationModule { }
