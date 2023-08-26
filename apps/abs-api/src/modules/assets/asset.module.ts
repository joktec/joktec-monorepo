import { Module } from '@joktec/core';
import { AssetController } from './asset.controller';
import { AssetRepo } from './asset.repo';
import { AssetService } from './asset.service';

@Module({
  controllers: [AssetController],
  providers: [AssetRepo, AssetService],
  exports: [AssetService],
})
export class AssetModule {}
