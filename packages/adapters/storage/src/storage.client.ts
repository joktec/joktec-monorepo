import { S3Client } from '@aws-sdk/client-s3';
import { Client } from '@joktec/core';
import {
  StorageDownloadRequest,
  StorageDownloadResponse,
  StorageListObjectsRequest,
  StorageListObjectsResponse,
  StoragePreSignedRequest,
  StoragePreSignedResponse,
  StorageUploadRequest,
  StorageUploadResponse,
} from './models';
import { StorageConfig } from './storage.config';

export interface StorageClient extends Client<StorageConfig, S3Client> {
  bucketExists(bucket: string, conId?: string): Promise<boolean>;

  makeBucket(bucket: string, conId?: string): Promise<void>;

  upload(req: StorageUploadRequest, conId?: string): Promise<StorageUploadResponse>;

  download(req: StorageDownloadRequest, conId?: string): Promise<StorageDownloadResponse>;

  presigned(req: StoragePreSignedRequest, conId?: string): Promise<StoragePreSignedResponse>;

  listObjects(req: StorageListObjectsRequest, conId?: string): Promise<StorageListObjectsResponse[]>;
}
