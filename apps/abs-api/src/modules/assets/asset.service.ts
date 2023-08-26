import path from 'path';
import { BaseService, Injectable, JwtPayload, MulterFile } from '@joktec/core';
import { StorageService, StorageUploadRequest, StorageUploadResponse } from '@joktec/storage';
import moment from 'moment';
import { AssetRepo } from './asset.repo';
import { Asset, AssetFailedDto, AssetResponseDto, AssetStatus } from './models';

@Injectable()
export class AssetService extends BaseService<Asset, string> {
  constructor(
    protected assetRepo: AssetRepo,
    private storageService: StorageService,
  ) {
    super(assetRepo);
  }

  async singleUpload(file: MulterFile, payload?: JwtPayload): Promise<Asset> {
    const now = moment();
    const { name, ext } = path.parse(file.originalname);
    const req: StorageUploadRequest = {
      file: file.buffer,
      filename: `${name}_${now.unix()}${ext}`,
      prefix: now.format('YYYY/MM/DD'),
    };
    const res: StorageUploadResponse = await this.storageService.upload(req);
    return this.assetRepo.create({
      title: name,
      originalName: file.originalname,
      key: res.key,
      etag: res.eTag?.replace(/"/g, '') || '',
      mimeType: res.contentType,
      size: file.size,
      status: AssetStatus.ACTIVATED,
      createdBy: payload?.sub,
      updatedBy: payload?.sub,
    });
  }

  async bulkUpload(files: MulterFile[], payload?: JwtPayload): Promise<AssetResponseDto> {
    const successAssets: Asset[] = [];
    const failedAssets: AssetFailedDto[] = [];
    await Promise.allSettled(
      files.map(async (file: MulterFile) => {
        try {
          const asset = await this.singleUpload(file, payload);
          successAssets.push(asset);
        } catch (error) {
          failedAssets.push({ title: file.originalname, mimeType: file.mimetype, size: file.size });
        }
      }),
    );
    return { success: successAssets, failed: failedAssets };
  }
}
