import { AbstractClientService, DEFAULT_CON_ID, Injectable } from '@baotg/core';
import { MinioConfig } from './minio.config';
import { MinioClient } from './minio.client';
import Minio, { BucketItemStat, UploadedObjectInfo } from 'minio';
import ImageDownload from 'image-downloader';
import * as fs from 'fs';
import { uuid } from 'uuidv4';
import { Readable as ReadableStream } from 'stream';

@Injectable()
export class MinioService extends AbstractClientService<MinioConfig, Minio.Client> implements MinioClient {
  constructor() {
    super('minio', MinioConfig);
  }

  async init(config: MinioConfig): Promise<Minio.Client> {
    return new Minio.Client(config.options);
  }

  async start(client: Minio.Client, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Nothing
  }

  async stop(client: Minio.Client, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Nothing
  }

  async bucketExists(bucket: string, conId: string = DEFAULT_CON_ID): Promise<boolean> {
    return this.getClient(conId).bucketExists(bucket);
  }

  async makeBucket(bucket: string, conId: string = DEFAULT_CON_ID): Promise<void> {
    const exist = await this.bucketExists(bucket, conId);
    if (!exist) {
      const region = this.getConfig(conId).region || 'ap-southeast-1';
      await this.getClient(conId).makeBucket(bucket, region);
    }
  }

  async uploadImageFromLink(
    bucket: string,
    link: string,
    dir: string,
    name: string = uuid(),
    conId: string = DEFAULT_CON_ID,
  ): Promise<string> {
    const localPath = `${name}.jpg`;
    const remotePath = `${dir}/${name}.jpg`;

    try {
      await this.makeBucket(bucket, conId);
      const { filename } = await ImageDownload.image({ url: link, dest: localPath });
      await this.getClient(conId).fPutObject(bucket, remotePath, filename, {});
      await fs.promises.unlink(filename);
      return `${this.getConfig(conId).cdnUrl}/${bucket}/${remotePath}`;
    } catch (error) {
      this.logService.error(error, '`%s` minio error', conId);
      return null;
    }
  }

  async upload(
    bucket: string,
    fileName: string,
    data: Buffer,
    metaData?: object,
    conId: string = DEFAULT_CON_ID,
  ): Promise<UploadedObjectInfo> {
    return this.getClient(conId).putObject(bucket, fileName, data, metaData);
  }

  async getStatisticObject(bucket: string, path: string, conId: string = DEFAULT_CON_ID): Promise<BucketItemStat> {
    return this.getClient(conId).statObject(bucket, path);
  }

  async getObject(bucket: string, path: string, conId: string = DEFAULT_CON_ID): Promise<ReadableStream> {
    return this.getClient(conId).getObject(bucket, path);
  }
}
