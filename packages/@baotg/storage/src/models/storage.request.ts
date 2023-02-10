import AWS from 'aws-sdk';

export type GetObjectRequest = AWS.S3.Types.GetObjectRequest;

export type PutObjectRequest = AWS.S3.Types.PutObjectRequest;

export type StorageACL =
  | 'private'
  | 'public-read'
  | 'public-read-write'
  | 'authenticated-read'
  | 'aws-exec-read'
  | 'bucket-owner-read'
  | 'bucket-owner-full-control'
  | string;

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
  operation: 'putObject' | 'getObject' | string;
  key: string;
  bucket?: string;
  expires?: number;
  acl?: StorageACL;
  contentType?: string;
}
