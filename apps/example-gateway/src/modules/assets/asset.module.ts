import { Module } from '@joktec/core';
import { StorageModule } from '@joktec/storage';
import { AssetController } from './asset.controller';
import { AssetRepo } from './asset.repo';
import { AssetService } from './asset.service';

@Module({
  imports: [StorageModule],
  controllers: [AssetController],
  providers: [AssetRepo, AssetService],
  exports: [AssetService],
})
export class AssetModule {}
