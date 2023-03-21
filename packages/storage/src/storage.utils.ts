import { BadRequestException } from '@joktec/core';
import urlParse from 'url-parse';

export const parseKey = (link: string, bucket: string): string => {
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
};
