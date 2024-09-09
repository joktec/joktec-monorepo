import { Module } from '@joktec/core';
import { ConnectionController } from './connection.controller';
import { ConnectionService } from './connection.service';

@Module({
  controllers: [ConnectionController],
  providers: [ConnectionService],
  exports: [ConnectionService],
})
export class ConnectionModule {}
