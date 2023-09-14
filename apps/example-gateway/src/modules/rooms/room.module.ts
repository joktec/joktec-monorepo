import { Module } from '@joktec/core';
import { RoomController } from './room.controller';
import { RoomRepo } from './room.repo';
import { RoomService } from './room.service';

@Module({
  controllers: [RoomController],
  providers: [RoomRepo, RoomService],
  exports: [RoomRepo, RoomService],
})
export class RoomModule {}
