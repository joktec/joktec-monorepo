import { Readable } from 'stream';

export interface StorageUploadResponse {
  key: string;
  link: string;
  eTag?: string;
}

export interface StorageDownloadResponse {
  file: Buffer | Uint8Array | string | Readable | ReadableStream;
  key: string;
  eTag?: string;
  contentType?: string;
}

export interface StoragePreSignedResponse {
  key: string;
  url: string;
}
