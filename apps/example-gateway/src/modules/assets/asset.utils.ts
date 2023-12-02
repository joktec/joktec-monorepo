import path from 'path';
import { FileFilter } from '@joktec/core';
import { byteLength } from 'byte-length';
import mime from 'mime-types';
import moment from 'moment';
import sharp from 'sharp';

export const MAX_TOTAL_FILE = 10;
export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const fileFilter = FileFilter({ fileTypes: '*', maxSize: MAX_FILE_SIZE });

export class AssetUtils {
  static async isImage(buffer: Buffer): Promise<boolean> {
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

  static getMetadata(
    originalName: string = 'file',
    mimetype: string = 'application/octet-stream',
  ): { prefix: string; filename: string; ext: string; contentType?: string } {
    const encodeFilename = encodeURIComponent(path.parse(originalName).name);
    let ext = path.parse(originalName).ext || mime.extension(mimetype) || '';
    if (!ext.startsWith('.')) ext = `.${ext}`;
    if (ext === '.bin') ext = '';
    const contentType = mime.lookup(originalName);
    return {
      ext,
      prefix: moment().format('YYYY/MM/DD'),
      filename: `${encodeFilename}_${moment().unix()}${ext}`,
      contentType: contentType || mimetype,
    };
  }

  static async getSize(file: Buffer): Promise<{ width?: number; height?: number; size: number }> {
    if (!(await this.isImage(file))) return { size: byteLength(file) };
    const metadata = await sharp(file.buffer).metadata();
    return { width: metadata.width, height: metadata.height, size: metadata.size };
  }

  static async compress(file: Buffer, limit: number = Number.POSITIVE_INFINITY): Promise<Buffer> {
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
