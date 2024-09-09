import {
  ClientController,
  Controller,
  IMicroControllerProps,
  JwtPayload,
  MessagePattern,
  Payload,
  Transport,
} from '@joktec/core';
import { Asset } from '../../models/schemas';
import { AssetService } from './asset.service';
import { AssetPresignedDto } from './models';

const props: IMicroControllerProps<Asset> = {
  dto: Asset,
  transport: Transport.REDIS,
};

@Controller('assets')
export class AssetController extends ClientController<Asset, string>(props) {
  constructor(protected assetService: AssetService) {
    super(assetService);
  }

  @MessagePattern({ cmd: `Asset.presigned` }, Transport.REDIS)
  async presigned(
    @Payload('dto') dto: AssetPresignedDto,
    @Payload('adminJwt') adminJwt: JwtPayload = null,
    @Payload('userJwt') userJwt: JwtPayload = null,
  ): Promise<Asset> {
    return this.assetService.presigned(dto, { admin: adminJwt, user: userJwt });
  }

  @MessagePattern({ cmd: `Asset.uploadFromUrl` }, Transport.REDIS)
  async uploadFromUrl(
    @Payload('url') url: string,
    @Payload('adminJwt') adminJwt: JwtPayload = null,
    @Payload('userJwt') userJwt: JwtPayload = null,
  ): Promise<Asset> {
    return this.assetService.uploadFromUrl(url, { admin: adminJwt, user: userJwt });
  }
}
