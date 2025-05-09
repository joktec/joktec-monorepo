import path from 'path';
import { BaseService, Injectable, JwtPayload } from '@joktec/core';
import { HttpService } from '@joktec/http';
import { ObjectId } from '@joktec/mongo';
import {
  compressFile,
  getFilesize,
  getMetadata,
  StorageOperation,
  StoragePreSignedRequest,
  StorageService,
  StorageUploadRequest,
  StorageUploadResponse,
} from '@joktec/storage';
import { plainToInstance } from '@joktec/utils';
import { AssetStatus } from '../../models/constants';
import { Asset } from '../../models/schemas';
import { AssetRepo } from '../../repositories';
import { AssetPresigned, AssetPresignedDto } from './models';

@Injectable()
export class AssetService extends BaseService<Asset, string> {
  constructor(
    protected assetRepo: AssetRepo,
    private storageService: StorageService,
    private httpService: HttpService,
  ) {
    super(assetRepo);
  }

  async presigned(
    dto: AssetPresignedDto,
    payload: { admin?: JwtPayload; user?: JwtPayload } = {},
  ): Promise<AssetPresigned> {
    const { prefix, filename, contentType } = getMetadata(dto.filename, dto.contentType);
    const { admin: adminJwt, user: userJwt } = payload;
    const asset: Partial<Asset> = {
      originalName: dto.filename,
      filename,
      key: path.posix.join(prefix, filename),
      mimeType: contentType,
      status: AssetStatus.PENDING,
      authorId: userJwt?.sub || null,
      createdBy: adminJwt?.sub ? ObjectId.create(adminJwt?.sub) : null,
      updatedBy: adminJwt?.sub ? ObjectId.create(adminJwt?.sub) : null,
    };

    try {
      const req: StoragePreSignedRequest = { operation: StorageOperation.PUT_OBJECT, prefix, filename, contentType };
      const { url } = await this.storageService.presigned(req);
      const newAsset = await this.assetRepo.create({ ...asset });
      return plainToInstance(AssetPresigned, { ...newAsset, presignedUrl: url });
    } catch (err) {
      return this.assetRepo.create({ ...asset, status: AssetStatus.FAILED });
    }
  }

  async uploadFromUrl(url: string, payload: { admin?: JwtPayload; user?: JwtPayload } = {}): Promise<Asset> {
    const parsedUrl = new URL(url);
    const urlFilename = path.basename(parsedUrl.pathname);
    const { prefix, filename, contentType } = getMetadata(urlFilename);

    const response = await this.httpService.request({ url, method: 'GET', responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');
    const compressFileBuffer = await compressFile(buffer);

    const { admin: adminJwt, user: userJwt } = payload;
    const asset: Partial<Asset> = {
      originalName: urlFilename,
      filename,
      key: path.posix.join(prefix, filename),
      mimeType: contentType,
      authorId: userJwt?.sub || null,
      createdBy: adminJwt?.sub ? ObjectId.create(adminJwt?.sub) : null,
      updatedBy: adminJwt?.sub ? ObjectId.create(adminJwt?.sub) : null,
      ...(await getFilesize(compressFileBuffer)),
    };

    try {
      const req: StorageUploadRequest = { file: compressFileBuffer, prefix, filename, contentType };
      const res: StorageUploadResponse = await this.storageService.upload(req);
      const etag = res.eTag?.replace(/"/g, '') || '';
      return this.assetRepo.create({ ...asset, etag, status: AssetStatus.ACTIVATED });
    } catch (err) {
      return this.assetRepo.create({ ...asset, status: AssetStatus.FAILED });
    }
  }
}
