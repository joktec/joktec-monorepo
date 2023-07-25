import path from 'path';
import {
  CreateBucketCommand,
  GetObjectCommand,
  GetObjectCommandInput,
  HeadBucketCommand,
  ListObjectsCommand,
  ListObjectsCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { AbstractClientService, DEFAULT_CON_ID, Injectable, Retry } from '@joktec/core';
import mime from 'mime-types';
import {
  StorageDownloadRequest,
  StorageDownloadResponse,
  StorageListObjectsRequest,
  StorageListObjectsResponse,
  StorageOperation,
  StoragePreSignedRequest,
  StoragePreSignedResponse,
  StorageUploadRequest,
  StorageUploadResponse,
} from './models';
import { StorageClient } from './storage.client';
import { DEFAULT_CONTENT_TYPE, StorageConfig } from './storage.config';
import { StorageMetric, StorageMetricType } from './storage.metric';
import { parseKey } from './storage.utils';

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
      credentials: {
        accessKeyId: config.accessKey,
        secretAccessKey: config.secretKey,
        sessionToken: config.sessionToken,
      },
    });
  }

  async start(client: S3Client, conId: string = DEFAULT_CON_ID): Promise<void> {
    const { bucket } = this.getConfig(conId);
    if (bucket) {
      await this.makeBucket(bucket, conId);
    }
  }

  async stop(client: S3Client, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Do nothing
  }

  async bucketExists(bucket: string, conId: string = DEFAULT_CON_ID): Promise<boolean> {
    try {
      await this.getClient(conId).send(new HeadBucketCommand({ Bucket: bucket }));
      return true;
    } catch (error) {
      if (error.statusCode === 404 || error.name === 'NotFound') {
        return false;
      }
      throw error;
    }
  }

  async makeBucket(bucket: string, conId: string = DEFAULT_CON_ID): Promise<void> {
    const exist = await this.bucketExists(bucket, conId);
    if (!exist) {
      const command = new CreateBucketCommand({ Bucket: bucket });
      const response = await this.getClient(conId).send(command);
      this.logService.info('`%s` %s - Bucket %s created at %s', conId, this.service, bucket, response.Location);
    }
  }

  @StorageMetric(StorageMetricType.UPLOAD)
  async upload(req: StorageUploadRequest, conId: string = DEFAULT_CON_ID): Promise<StorageUploadResponse> {
    const config = this.getConfig(conId);
    const params: PutObjectCommandInput = {
      Body: req.file,
      ACL: req.acl || config.acl,
      Bucket: req.bucket || config.bucket,
      Key: path.posix.join(req.prefix || '', req.filename),
    };

    if (!req.contentType || req.contentType.endsWith('*')) {
      params.ContentType = mime.lookup(req.filename) || DEFAULT_CONTENT_TYPE;
    }

    const data = await this.getClient(conId).send(new PutObjectCommand(params));
    return {
      key: params.Key,
      link: config.buildLink(params.Key, params.Bucket),
      eTag: data.ETag,
      contentType: params.ContentType,
    };
  }

  @StorageMetric(StorageMetricType.DOWNLOAD)
  async download(req: StorageDownloadRequest, conId: string = DEFAULT_CON_ID): Promise<StorageDownloadResponse> {
    const config = this.getConfig(conId);
    const params: GetObjectCommandInput = {
      Bucket: req.bucket || config.bucket,
      Key: parseKey(req.key, req.bucket || config.bucket),
    };
    const data = await this.getClient(conId).send(new GetObjectCommand(params));
    return {
      key: params.Key,
      file: data.Body,
      eTag: data.ETag,
      contentType: data.ContentType,
    };
  }

  @StorageMetric(StorageMetricType.PRE_SIGNED)
  async preSignedUrl(req: StoragePreSignedRequest, conId: string = DEFAULT_CON_ID): Promise<StoragePreSignedResponse> {
    const config = this.getConfig(conId);
    const params = {
      Bucket: req.bucket || config.bucket,
      Key: req.key,
      ACL: req.acl || config.acl,
      ContentType: req.contentType,
    };

    if (!req.contentType || req.contentType.endsWith('*')) {
      params.ContentType = mime.lookup(req.key) || DEFAULT_CONTENT_TYPE;
    }

    const expires = req.expires || 60 * 5;
    const operation: StorageOperation = req.operation || StorageOperation.GET_OBJECT;
    const command =
      operation === StorageOperation.PUT_OBJECT ? new PutObjectCommand(params) : new GetObjectCommand(params);
    const url: string = await getSignedUrl(this.getClient(conId), command, { expiresIn: expires });
    return { url, key: req.key };
  }

  async listObjects(
    req: StorageListObjectsRequest,
    conId: string = DEFAULT_CON_ID,
  ): Promise<StorageListObjectsResponse[]> {
    const config = this.getConfig(conId);
    const params: ListObjectsCommandInput = {
      Bucket: req.bucket || config.bucket,
      Prefix: req.prefix || '',
    };
    const data = await this.getClient(conId).send(new ListObjectsCommand(params));
    return data.Contents.map(item => ({
      key: item.Key,
      eTag: item.ETag,
      size: item.Size,
      lastModified: item.LastModified,
      contentType: mime.lookup(item.Key) || DEFAULT_CONTENT_TYPE,
    }));
  }
}
