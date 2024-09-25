import { ObjectId } from '../models';

export const isObjectIdType = (designType: any): boolean => {
  return designType === ObjectId || designType === ObjectId.prototype.constructor;
};
