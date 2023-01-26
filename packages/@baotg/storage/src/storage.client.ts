import { Client } from '@baotg/core';
import { StorageConfig } from './storage.config';
import AWS from 'aws-sdk';
import { StorageDownloadRequest, StorageDownloadResponse, StorageUploadRequest, StorageUploadResponse } from './models';

export class S3Client extends AWS.S3 {}

export interface StorageClient extends Client<StorageConfig, S3Client> {
  upload(req: StorageUploadRequest, conId?: string): Promise<StorageUploadResponse>;

  download(req: StorageDownloadRequest, conId?: string): Promise<StorageDownloadResponse>;
}
