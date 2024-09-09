import { Module } from '@joktec/core';
import { StorageModule } from '@joktec/storage';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';
import { AssetUtils } from './asset.utils';

@Module({
  imports: [StorageModule],
  controllers: [AssetController],
  providers: [AssetService, AssetUtils],
  exports: [AssetService, AssetUtils],
})
export class AssetModule {}
