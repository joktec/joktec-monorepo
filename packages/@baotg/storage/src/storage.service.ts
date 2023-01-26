import { AbstractClientService, DEFAULT_CON_ID, Injectable, Retry } from '@baotg/core';
import { StorageConfig } from './storage.config';
import { S3Client, StorageClient } from './storage.client';
import {
  StorageDownloadRequest,
  StorageDownloadResponse,
  StorageUploadRequest,
  StorageUploadResponse,
  GetObjectRequest,
  PutObjectRequest,
} from './models';
import path from 'path';
import { DownloadRedisMetric, UploadRedisMetric } from './storage.metric';

const RETRY_OPTS = 'storage.retry';

@Injectable()
export class StorageService extends AbstractClientService<StorageConfig, S3Client> implements StorageClient {
  constructor() {
    super('storage', StorageConfig);
  }

  @Retry(RETRY_OPTS)
  protected async init(config: StorageConfig): Promise<S3Client> {
    return new S3Client({
      ...config,
      region: config.region,
      credentials: { ...config.credentials },
    });
  }

  async start(client: S3Client, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Do nothing
  }

  async stop(client: S3Client, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Do nothing
  }

  @DownloadRedisMetric()
  async download(req: StorageDownloadRequest, conId: string = DEFAULT_CON_ID): Promise<StorageDownloadResponse> {
    const config = this.getConfig(conId);
    const key = req.key.replace(config.endpoint, '');
    const params: GetObjectRequest = { Bucket: req.bucket || config.bucket, Key: key };
    const data = await this.getClient(conId).getObject(params).promise();
    return {
      key,
      file: data.Body as Buffer,
      contentType: data.ContentType,
      eTag: data.ETag,
    };
  }

  @UploadRedisMetric()
  async upload(req: StorageUploadRequest, conId: string = DEFAULT_CON_ID): Promise<StorageUploadResponse> {
    const config = this.getConfig(conId);
    const key = path.posix.join(req.prefix || '', req.filename);
    const params: PutObjectRequest = {
      Body: req.file,
      ACL: req.acl || 'public-read',
      Bucket: req.bucket || config.bucket,
      Key: key,
      ContentType: req.contentType,
    };
    const data = await this.getClient(conId).putObject(params).promise();
    return {
      key,
      link: config.endpoint + '/' + key,
      eTag: data.ETag,
    };
  }
}
