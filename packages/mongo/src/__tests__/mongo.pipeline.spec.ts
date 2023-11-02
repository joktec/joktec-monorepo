import { describe, expect, it } from '@jest/globals';
import { ISort } from '@joktec/core';
import { MongoPipeline } from '../helpers';

describe('MongoPipeline class', () => {
  describe('projection function', () => {
    it('should return a mongo projection to includes some fields', () => {
      const select = 'name,age,address.city';
      const result = MongoPipeline.projection(select);
      expect(result).toEqual({ name: 1, age: 1, 'address.city': 1 });
    });

    it('should return a mongo projection to includes and excludes some fields', () => {
      const select = 'name,-age,address.city';
      const result = MongoPipeline.projection(select);
      expect(result).toEqual({ name: 1, age: 0, 'address.city': 1 });
    });

    it('should return an empty object if select is empty', () => {
      const select = '';
      const result = MongoPipeline.projection(select);
      expect(result).toEqual({});
    });
  });

  describe('sort function', () => {
    it('should return a mongo sorter structure', () => {
      const sort: ISort = { name: 'asc', createdAt: 'desc' };
      const result = MongoPipeline.sort(sort);
      expect(result).toEqual({ name: 1, createdAt: -1 });
    });

    it('should return an empty object if select is empty', () => {
      const result = MongoPipeline.sort({});
      expect(result).toEqual({});
    });
  });
});
