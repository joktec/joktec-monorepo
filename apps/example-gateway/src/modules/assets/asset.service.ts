import path from 'path';
import { BaseService, ClientProxy, Inject, Injectable, JwtPayload, MulterFile } from '@joktec/core';
import { StorageService, StorageUploadRequest, StorageUploadResponse } from '@joktec/storage';
import { firstValueFrom } from 'rxjs';
import { TRANSPORT } from '../../app.constant';
import { AssetStatus } from '../../models/constants';
import { Asset } from '../../models/schemas';
import { AssetRepo } from '../../repositories';
import { AssetUtils } from './asset.utils';
import { AssetPresigned, AssetPresignedDto } from './models';

@Injectable()
export class AssetService extends BaseService<Asset, string> {
  constructor(
    protected assetRepo: AssetRepo,
    @Inject(TRANSPORT.PROXY.ASSET) private assetClient: ClientProxy,
    private assetUtils: AssetUtils,
    private storageService: StorageService,
  ) {
    super(assetRepo);
  }

  async upload(file: MulterFile, payload: JwtPayload, idx: number): Promise<{ idx: number; data: Asset }> {
    const { prefix, filename, contentType } = this.assetUtils.getMetadata(file.originalname, file.mimetype);
    const compressBuffer = await this.assetUtils.compress(file.buffer);
    const asset: Partial<Asset> = {
      originalName: file.originalname,
      filename,
      key: path.posix.join(prefix, filename),
      mimeType: contentType,
      authorId: payload.sub,
      ...(await this.assetUtils.getSize(compressBuffer)),
    };

    let resAsset: Asset;
    try {
      const req: StorageUploadRequest = { file: compressBuffer, prefix, filename, contentType };
      const res: StorageUploadResponse = await this.storageService.upload(req);
      const etag = res.eTag?.replace(/"/g, '') || '';
      resAsset = await this.assetRepo.create({ ...asset, etag, status: AssetStatus.ACTIVATED });
    } catch (err) {
      resAsset = await this.assetRepo.create({ ...asset, status: AssetStatus.FAILED });
    }
    return { idx, data: resAsset };
  }

  async presigned(
    dto: AssetPresignedDto,
    payload: JwtPayload,
    idx: number,
  ): Promise<{ idx: number; data: AssetPresigned }> {
    const observable = this.assetClient.send<AssetPresigned>({ cmd: `Asset.presigned` }, { dto, userJwt: payload });
    return { idx, data: await firstValueFrom(observable) };
  }

  async uploadFromUrl(url: string, payload: JwtPayload, idx: number): Promise<{ idx: number; data: Asset }> {
    const observable = this.assetClient.send<Asset>({ cmd: `Asset.uploadFromUrl` }, { url, userJwt: payload });
    return { idx, data: await firstValueFrom(observable) };
  }
}
