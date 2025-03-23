import { Readable } from 'stream';

export interface StorageUploadResponse {
  key: string;
  link: string;
  eTag?: string;
  contentType?: string;
}

export interface StorageDownloadResponse {
  file: Readable | ReadableStream | Blob;
  key: string;
  eTag?: string;
  contentType?: string;
}

export interface StoragePreSignedResponse {
  key: string;
  url: string;
  contentType?: string;
}

export interface StorageListObjectsResponse {
  key: string;
  eTag: string;
  size?: number;
  lastModified?: Date;
  contentType?: string;
}
