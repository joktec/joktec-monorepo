import path from 'path';
import { BaseService, Injectable, JwtPayload, MulterFile } from '@joktec/core';
import { StorageService, StorageUploadRequest, StorageUploadResponse } from '@joktec/storage';
import { byteLength } from 'byte-length';
import moment from 'moment';
import sharp from 'sharp';
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

  private async compress(file: MulterFile): Promise<Buffer> {
    const maxSizeInBytes = 1024 * 1024; // 1MB (adjust as needed)
    if (file.size <= maxSizeInBytes) return file.buffer;

    const targetSize = Math.sqrt(maxSizeInBytes); // Assuming square image
    const originalSize = await sharp(file.buffer).metadata();
    const scaleFactor = targetSize / Math.max(originalSize.width, originalSize.height);
    const targetWidth = Math.floor(originalSize.width * scaleFactor);
    const targetHeight = Math.floor(originalSize.height * scaleFactor);

    // Resize the image using sharp
    return await sharp(file.buffer)
      .resize(targetWidth, targetHeight)
      .jpeg({ quality: 80 }) // Adjust the desired quality
      .toBuffer();
  }

  private async singleUpload(file: MulterFile, payload?: JwtPayload): Promise<Asset> {
    const now = moment();
    const { name, ext = '.jpg' } = path.parse(file.originalname);
    const compressBuffer = await this.compress(file);
    const req: StorageUploadRequest = {
      file: compressBuffer,
      filename: `${encodeURIComponent(name)}_${now.unix()}${ext}`,
      prefix: now.format('YYYY/MM/DD'),
    };
    const res: StorageUploadResponse = await this.storageService.upload(req);
    return this.assetRepo.create({
      title: req.filename,
      originalName: file.originalname,
      key: res.key,
      etag: res.eTag?.replace(/"/g, '') || '',
      mimeType: res.contentType,
      size: byteLength(compressBuffer),
      status: AssetStatus.ACTIVATED,
      createdBy: payload?.sub,
      updatedBy: payload?.sub,
    });
  }

  async bulkUpload(files: MulterFile[], payload?: JwtPayload): Promise<AssetResponseDto> {
    const successAssets: Asset[] = [];
    const failedAssets: AssetFailedDto[] = [];
    await Promise.all(
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
