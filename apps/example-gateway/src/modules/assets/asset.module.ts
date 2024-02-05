import { Module } from '@joktec/core';
import { StorageModule } from '@joktec/storage';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';

@Module({
  imports: [StorageModule],
  controllers: [AssetController],
  providers: [AssetService],
  exports: [AssetService],
})
export class AssetModule {}
