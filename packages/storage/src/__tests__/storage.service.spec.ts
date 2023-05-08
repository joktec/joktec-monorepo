import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Test } from '@nestjs/testing';
import { PutObjectCommandInput } from '@aws-sdk/client-s3';
import AWSMock from 'aws-sdk-mock';
import { StorageService } from '../storage.service';
import { CoreModule, DEFAULT_CON_ID } from '@joktec/core';
import { StorageModule } from '../storage.module';

describe('StorageService', () => {
  let storageService: StorageService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CoreModule, StorageModule],
    }).compile();
    storageService = moduleRef.get<StorageService>(StorageService);

    AWSMock.mock('S3', 'putObject', (params: PutObjectCommandInput, callback) => {
      callback(null, { ETag: 'mock-etag' });
    });
  });

  afterEach(() => {
    AWSMock.restore('S3');
  });

  describe('upload', () => {
    it('should upload a file to S3', async () => {
      const req = {
        file: Buffer.from('test file'),
        prefix: 'public',
        filename: 'mock-filename.txt',
      };
      // Call the upload method
      const result = await storageService.upload(req, DEFAULT_CON_ID);

      // Assert that the result is as expected
      expect(result.key).toEqual('public/mock-filename.txt');
      expect(result.eTag).toEqual('mock-etag');
    });
  });
});
