import { Module } from '@joktec/core';
import { UserModule } from '../users';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';

@Module({
  imports: [UserModule],
  controllers: [PlaceController],
  providers: [PlaceService],
  exports: [PlaceService],
})
export class PlaceModule {}
