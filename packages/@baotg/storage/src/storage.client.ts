import { Client } from '@baotg/core';
import { StorageConfig } from './storage.config';
import AWS from 'aws-sdk';
import {
  StorageDownloadRequest,
  StorageDownloadResponse,
  StoragePreSignedRequest,
  StoragePreSignedResponse,
  StorageUploadRequest,
  StorageUploadResponse,
} from './models';

export interface StorageClient extends Client<StorageConfig, AWS.S3> {
  bucketExists(bucket: string, conId?: string): Promise<boolean>;

  makeBucket(bucket: string, conId?: string): Promise<void>;

  upload(req: StorageUploadRequest, conId?: string): Promise<StorageUploadResponse>;

  download(req: StorageDownloadRequest, conId?: string): Promise<StorageDownloadResponse>;

  preSignedUrl(req: StoragePreSignedRequest, conId?: string): Promise<StoragePreSignedResponse>;
}
