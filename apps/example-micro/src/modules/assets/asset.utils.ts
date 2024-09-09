import path from 'path';
import { Injectable } from '@joktec/core';
import { byteLength } from 'byte-length';
import mime from 'mime-types';
import moment from 'moment';
import sharp from 'sharp';
import { DEFAULT_MIMETYPE, DEFAULT_ORIGINAL_NAME, DEFAULT_PREFIX } from './models';

@Injectable()
export class AssetUtils {
  constructor() {}

  async isImage(buffer: Buffer): Promise<boolean> {
    const jpg = buffer.subarray(0, 3).toString('hex') === 'ffd8ff';
    const png = buffer.subarray(0, 8).toString('hex') === '89504e470d0a1a0a';
    const gif =
      buffer.subarray(0, 6).toString('hex') === '474946383761' ||
      buffer.subarray(0, 6).toString('hex') === '474946383961';
    const bmp = buffer.subarray(0, 2).toString('hex') === '424d';
    const webp =
      buffer.subarray(0, 12).toString('hex') === '52494646' && buffer.subarray(8, 16).toString('hex') === '57454250';
    return jpg || png || gif || bmp || webp;
  }

  getMetadata(
    filename: string = DEFAULT_ORIGINAL_NAME,
    mimetype: string = DEFAULT_MIMETYPE,
  ): { prefix: string; filename: string; contentType?: string } {
    const now = moment();
    const encodeFilename = encodeURIComponent(path.parse(filename).name);
    let ext = path.parse(filename).ext || mime.extension(mimetype) || '';
    if (!ext.startsWith('.')) ext = `.${ext}`;
    if (ext === '.bin') ext = '';
    const contentType = mime.lookup(filename);
    return {
      prefix: now.format(DEFAULT_PREFIX),
      filename: `${encodeFilename}_${now.unix()}${ext}`,
      contentType: contentType || mimetype,
    };
  }

  async getSize(file: Buffer): Promise<{ width?: number; height?: number; size: number }> {
    if (!(await this.isImage(file))) return { size: byteLength(file) };
    const metadata = await sharp(file.buffer).metadata();
    return { width: metadata.width, height: metadata.height, size: metadata.size };
  }

  async compress(file: Buffer, limit: number = Number.POSITIVE_INFINITY): Promise<Buffer> {
    if (!(await this.isImage(file))) return file;
    if (limit === 0 || limit === Number.POSITIVE_INFINITY || byteLength(file) <= limit) return file;

    const targetSize = Math.sqrt(limit); // Assuming square image
    const { width, height } = await this.getSize(file);

    const scaleFactor = targetSize / Math.max(width, height);
    const newWidth = Math.floor(width * scaleFactor);
    const newHeight = Math.floor(height * scaleFactor);

    return sharp(file).resize(newWidth, newHeight).toBuffer();
  }
}
