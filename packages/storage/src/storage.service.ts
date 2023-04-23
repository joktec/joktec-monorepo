import { AbstractClientService, DEFAULT_CON_ID, Injectable, Retry } from '@joktec/core';
import { DEFAULT_CONTENT_TYPE, StorageConfig } from './storage.config';
import { StorageClient } from './storage.client';
import {
  GetObjectRequest,
  PutObjectRequest,
  StorageDownloadRequest,
  StorageDownloadResponse,
  StorageOperation,
  StoragePreSignedRequest,
  StoragePreSignedResponse,
  StorageUploadRequest,
  StorageUploadResponse,
} from './models';
import { StorageMetric, StorageMetricType } from './storage.metric';
import AWS from 'aws-sdk';
import path from 'path';
import { parseKey } from './storage.utils';
import mime from 'mime-types';

const RETRY_OPTS = 'storage.retry';

@Injectable()
export class StorageService extends AbstractClientService<StorageConfig, AWS.S3> implements StorageClient {
  constructor() {
    super('storage', StorageConfig);
  }

  @Retry(RETRY_OPTS)
  protected async init(config: StorageConfig): Promise<AWS.S3> {
    return new AWS.S3({
      ...config,
      accessKeyId: config.accessKey,
      secretAccessKey: config.secretKey,
    });
  }

  async start(client: AWS.S3, conId: string = DEFAULT_CON_ID): Promise<void> {
    const { bucket } = this.getConfig(conId);
    if (bucket) {
      await this.makeBucket(bucket, conId);
    }
  }

  async stop(client: AWS.S3, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Do nothing
  }

  async bucketExists(bucket: string, conId: string = DEFAULT_CON_ID): Promise<boolean> {
    try {
      await this.getClient(conId).headBucket({ Bucket: bucket }).promise();
      return true;
    } catch (error) {
      if (error.statusCode === 404) {
        return false;
      }
      throw error;
    }
  }

  async makeBucket(bucket: string, conId: string = DEFAULT_CON_ID): Promise<void> {
    const exist = await this.bucketExists(bucket, conId);
    if (!exist) {
      await this.getClient(conId).createBucket({ Bucket: bucket }).promise();
    }
  }

  @StorageMetric(StorageMetricType.UPLOAD)
  async upload(req: StorageUploadRequest, conId: string = DEFAULT_CON_ID): Promise<StorageUploadResponse> {
    const config = this.getConfig(conId);
    const params: PutObjectRequest = {
      Body: req.file,
      ACL: req.acl || config.acl,
      Bucket: req.bucket || config.bucket,
      Key: path.posix.join(req.prefix || '', req.filename),
    };

    if (!req.contentType || req.contentType.endsWith('*')) {
      params.ContentType = mime.lookup(req.filename) || DEFAULT_CONTENT_TYPE;
    }

    const data = await this.getClient(conId).putObject(params).promise();
    return {
      key: params.Key,
      link: config.buildLink(params.Key, params.Bucket),
      eTag: data.ETag,
    };
  }

  @StorageMetric(StorageMetricType.DOWNLOAD)
  async download(req: StorageDownloadRequest, conId: string = DEFAULT_CON_ID): Promise<StorageDownloadResponse> {
    const config = this.getConfig(conId);
    const params: GetObjectRequest = {
      Bucket: req.bucket || config.bucket,
      Key: parseKey(req.key, req.bucket || config.bucket),
    };
    const data = await this.getClient(conId).getObject(params).promise();
    return {
      key: params.Key,
      file: data.Body as Buffer,
      contentType: data.ContentType,
      eTag: data.ETag,
    };
  }

  @StorageMetric(StorageMetricType.PRE_SIGNED)
  async preSignedUrl(req: StoragePreSignedRequest, conId: string = DEFAULT_CON_ID): Promise<StoragePreSignedResponse> {
    const config = this.getConfig(conId);
    const params = {
      Bucket: req.bucket || config.bucket,
      Key: req.key,
      Expires: req.expires || 60 * 5,
      ACL: req.acl || config.acl,
      ContentType: req.contentType,
    };

    const operation: StorageOperation = req.operation || StorageOperation.GET_OBJECT;
    const url: string = this.getClient(conId).getSignedUrl(operation, params);
    return { url, key: req.key };
  }
}
