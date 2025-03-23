import { QueryOptions } from 'mongoose';

export const UPDATE_OPTIONS: QueryOptions = {
  runValidators: true,
  new: true,
};

export const DELETE_OPTIONS: QueryOptions = {
  includeResultMetadata: false,
};

export const UPSERT_OPTIONS: QueryOptions = {
  upsert: true,
  new: true,
  runValidators: true,
};

export const PARANOID_OPTIONS: QueryOptions = {
  runValidators: true,
  new: true,
  paranoid: true,
};

export const RESTORE_OPTIONS: QueryOptions = {
  runValidators: true,
  new: true,
  paranoid: false,
};
