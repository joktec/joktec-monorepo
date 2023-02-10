import { Client } from '@baotg/core';
import { MinioConfig } from './minio.config';
import Minio, { BucketItemStat, UploadedObjectInfo } from 'minio';
import { Readable as ReadableStream } from 'stream';

export interface MinioClient extends Client<MinioConfig, Minio.Client> {
  bucketExists(bucket: string, conId?: string): Promise<boolean>;

  makeBucket(bucket: string, conId?: string): Promise<void>;

  upload(
    bucket: string,
    fileName: string,
    data: Buffer,
    metaData?: object,
    conId?: string,
  ): Promise<UploadedObjectInfo>;

  uploadImageFromLink(bucket: string, link: string, dir: string, name?: string, conId?: string): Promise<string>;

  getStatisticObject(bucket: string, path: string, conId?: string): Promise<BucketItemStat>;

  getObject(bucket: string, path: string, conId?: string): Promise<ReadableStream>;
}
