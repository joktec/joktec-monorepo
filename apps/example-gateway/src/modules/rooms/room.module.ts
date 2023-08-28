import { Module } from '@joktec/core';
import { RoomInterceptor } from './hooks';
import { RoomController } from './room.controller';
import { RoomRepo } from './room.repo';
import { RoomService } from './room.service';

@Module({
  controllers: [RoomController],
  providers: [RoomRepo, RoomService, RoomInterceptor],
  exports: [RoomRepo, RoomService],
})
export class RoomModule {}
