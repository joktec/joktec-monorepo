

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserLocationService } from './user-locations.service';
import { UserLocationController } from './user-locations.controller';
import { UserLocation, UserLocationSchema } from './schemas/user-locations.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserLocation.name, schema: UserLocationSchema },
    ]),
  ],
  providers: [UserLocationService],
  controllers: [UserLocationController],
  exports: [UserLocationService]
})

export class UserLocationModule {};
