import path from 'path';
import { BadRequestException } from '@joktec/core';
import { byteLength } from 'byte-length';
import mime from 'mime-types';
import sharp from 'sharp';
import urlParse from 'url-parse';
import { DEFAULT_MIMETYPE, DEFAULT_ORIGINAL_NAME } from './storage.constant';

export function parseKey(link: string, bucket: string): string {
  let path: string;

  if (link.startsWith('http://') || link.startsWith('https://')) {
    const parsedUrl = urlParse(link);
    path = parsedUrl.pathname;
  } else {
    path = `/${bucket}/${link}`;
  }

  path = path.replace(/^\/+/, '');
  const bucketPath = `${bucket}/`;
  const index = path.indexOf(bucketPath);
  if (index === -1) {
    throw new BadRequestException(`Bucket ${bucket} not found in link`);
  }

  const key = path.substring(index + bucketPath.length);
  return decodeURIComponent(key);
}

export function isImage(buffer: Buffer): boolean {
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

export async function getFilesize(file: Buffer): Promise<{ width?: number; height?: number; size: number }> {
  if (!isImage(file)) return { size: byteLength(file) };
  const metadata = await sharp(file.buffer).metadata();
  return { width: metadata.width, height: metadata.height, size: metadata.size };
}

export async function compressFile(file: Buffer, limit: number = Number.POSITIVE_INFINITY): Promise<Buffer> {
  if (!this.isImage(file)) return file;
  if (limit === 0 || limit === Number.POSITIVE_INFINITY || byteLength(file) <= limit) return file;

  const targetSize = Math.sqrt(limit); // Assuming square image
  const { width, height } = this.getSize(file);

  const scaleFactor = targetSize / Math.max(width, height);
  const newWidth = Math.floor(width * scaleFactor);
  const newHeight = Math.floor(height * scaleFactor);

  return sharp(file).resize(newWidth, newHeight).toBuffer();
}

export function getMetadata(
  filename: string = DEFAULT_ORIGINAL_NAME,
  mimetype: string = DEFAULT_MIMETYPE,
  onPrefix?: 'date' | 'month' | 'year' | (() => string),
): { filename: string; prefix?: string; contentType?: string } {
  const encodeFilename = encodeURIComponent(path.parse(filename).name);
  let ext = path.parse(filename).ext || mime.extension(mimetype) || '';
  if (!ext.startsWith('.')) ext = `.${ext}`;
  if (ext === '.bin') ext = '';
  const contentType = mime.lookup(filename) || mimetype;

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const unix = Math.floor(now.valueOf() / 1000);

  let prefix: string;
  switch (typeof onPrefix) {
    case 'string':
      if (onPrefix === 'date') prefix = `${year}/${month}/${day}`;
      if (onPrefix === 'month') prefix = `${year}/${month}`;
      if (onPrefix === 'year') prefix = `${year}}`;
      break;
    case 'function':
      prefix = onPrefix();
      break;
  }

  return { filename: `${encodeFilename}_${unix}${ext}`, prefix, contentType };
}
