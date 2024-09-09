import { Module } from '@joktec/core';
import { BlockController } from './block.controller';
import { BlockService } from './block.service';

@Module({
  controllers: [BlockController],
  providers: [BlockService],
  exports: [BlockService],
})
export class BlockModule {}
