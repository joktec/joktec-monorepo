import path from 'path';
import { BaseService, Injectable, JwtPayload, MulterFile } from '@joktec/core';
import {
  StorageOperation,
  StoragePreSignedRequest,
  StorageService,
  StorageUploadRequest,
  StorageUploadResponse,
} from '@joktec/storage';
import { AssetRepo } from './asset.repo';
import { AssetUtils } from './asset.utils';
import { Asset, AssetPresigned, AssetPresignedDto, AssetStatus } from './models';

@Injectable()
export class AssetService extends BaseService<Asset, string> {
  constructor(
    protected assetRepo: AssetRepo,
    private storageService: StorageService,
  ) {
    super(assetRepo);
  }

  async upload(file: MulterFile, payload?: JwtPayload): Promise<Asset> {
    const { prefix, filename, contentType } = AssetUtils.getMetadata(file.originalname, file.mimetype);
    const compressBuffer = await AssetUtils.compress(file.buffer);
    const asset: Partial<Asset> = {
      originalName: file.originalname,
      title: filename,
      key: path.posix.join(prefix, filename),
      mimeType: contentType,
      createdBy: payload?.sub,
      updatedBy: payload?.sub,
      ...(await AssetUtils.getSize(compressBuffer)),
    };

    try {
      const req: StorageUploadRequest = { file: compressBuffer, prefix, filename, contentType };
      const res: StorageUploadResponse = await this.storageService.upload(req);
      const etag = res.eTag?.replace(/"/g, '') || '';
      return this.assetRepo.create({ ...asset, etag, status: AssetStatus.ACTIVATED });
    } catch (err) {
      return this.assetRepo.create({ ...asset, status: AssetStatus.FAILED });
    }
  }

  async presigned(dto: AssetPresignedDto, payload?: JwtPayload): Promise<AssetPresigned> {
    const { prefix, filename, contentType } = AssetUtils.getMetadata(dto.filename, dto.contentType);
    const asset: Partial<Asset> = {
      originalName: dto.filename,
      title: filename,
      key: path.posix.join(prefix, filename),
      mimeType: contentType,
      status: AssetStatus.PENDING,
      createdBy: payload?.sub,
      updatedBy: payload?.sub,
    };

    try {
      const req: StoragePreSignedRequest = { operation: StorageOperation.PUT_OBJECT, prefix, filename, contentType };
      const { url } = await this.storageService.presigned(req);
      const newAsset = await this.assetRepo.create({ ...asset });
      return { ...newAsset, presignedUrl: url };
    } catch (err) {
      return this.assetRepo.create({ ...asset, status: AssetStatus.FAILED });
    }
  }
}
