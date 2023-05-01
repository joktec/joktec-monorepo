export enum StorageACL {
  PRIVATE = 'private',
  PUBLIC_READ = 'public-read',
  PUBLIC_READ_WRITE = 'public-read-write',
  AUTHENTICATED_READ = 'authenticated-read',
  AWS_EXEC_READ = 'aws-exec-read',
  BUCKET_OWNER_READ = 'bucket-owner-read',
  BUCKET_OWNER_FULL_CONTROL = 'bucket-owner-full-control',
}

export enum StorageOperation {
  PUT_OBJECT = 'putObject',
  GET_OBJECT = 'getObject',
}

export interface StorageUploadRequest {
  file: Buffer;
  filename: string;
  bucket?: string;
  acl?: StorageACL;
  prefix?: string;
  contentType?: string;
}

export interface StorageDownloadRequest {
  bucket?: string;
  key: string;
}

export interface StoragePreSignedRequest {
  operation: StorageOperation;
  key: string;
  bucket?: string;
  expires?: number;
  acl?: StorageACL;
  contentType?: string;
}

export interface StorageListObjectsRequest {
  bucket?: string;
  prefix?: string;
  filePattern?: string;
}
