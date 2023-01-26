import { isArray, isPlainObject } from 'lodash';

const UUID_BASE_ID = 'b0b6b3f9-6ea7-4a8f-a3b5';
const UUID_PADDING = 12;
const UUID_COMPONENTS = 4;
const BASE_16 = 16;

// Object
export const flattenKeys = (obj: object, currentPath: string | null): string[] => {
  let paths: string[] = [];

  for (const k in obj) {
    if (isPlainObject(obj[k]) || isArray(obj[k])) {
      paths = paths.concat(flattenKeys(obj[k], currentPath ? `${currentPath}.${k}` : k));
    } else {
      paths.push(currentPath ? `${currentPath}.${k}` : k);
    }
  }

  return paths;
};

export const uuidToInt = (stringUuid: string) => {
  const uuid = BigInt(`0x${stringUuid.split('-')[UUID_COMPONENTS]}`);
  return Number(uuid);
};

export const intToUuid = (number: number) => {
  let nbr;
  let randStr = '';
  const bigInt = BigInt(number);

  do {
    randStr += (nbr = Math.random()).toString(16).substr(3, 6);
  } while (randStr.length < 30);

  return `${UUID_BASE_ID}-${bigInt.toString(BASE_16).padStart(UUID_PADDING, '0')}`;
};
