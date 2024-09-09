import { Module, TransportProxyFactory } from '@joktec/core';
import { StorageModule } from '@joktec/storage';
import { TRANSPORT } from '../../app.constant';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';
import { AssetUtils } from './asset.utils';

@Module({
  imports: [StorageModule],
  controllers: [AssetController],
  providers: [AssetService, AssetUtils, TransportProxyFactory(TRANSPORT.PROXY.ASSET, TRANSPORT.NAME.REDIS)],
  exports: [AssetService, AssetUtils],
})
export class AssetModule {}
