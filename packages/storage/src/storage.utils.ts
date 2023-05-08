import urlParse from 'url-parse';
import { isEmpty } from 'lodash';

/**
 * Get the object key from a link
 * @param link
 * @param bucket
 */
export const parseKey = (link: string, bucket: string = ''): string => {
  let path: string = link;
  if (link.startsWith('http://') || link.startsWith('https://')) {
    const parsedUrl = urlParse(link);
    path = parsedUrl.pathname;
  }

  const pathArr = path.split('/').filter(p => !isEmpty(p) && p !== bucket);
  const key = pathArr.join('/');
  return decodeURIComponent(key);
};
