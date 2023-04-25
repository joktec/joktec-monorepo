import { describe, expect, it } from '@jest/globals';
import { preHandleCondition, preHandleQuery } from '../mongo.utils';
import { IMongoRequest } from '../models';

describe('preHandleCondition function', () => {
  it('should not modify a simple condition', () => {
    const condition = { foo: 'bar' };
    const result = preHandleCondition(condition);
    expect(result).toEqual(condition);
  });

  it('should replace "id" key with "_id"', () => {
    const condition = { id: '123', foo: 'bar' };
    const result = preHandleCondition(condition);
    expect(result).toEqual({ _id: '123', foo: 'bar' });
  });

  it('should handle nested objects', () => {
    const condition = { foo: 'bar', nested: { id: '123', baz: 'qux' } };
    const result = preHandleCondition(condition);
    expect(result).toEqual({ foo: 'bar', nested: { _id: '123', baz: 'qux' } });
  });

  it('should handle multiple nested objects', () => {
    const condition = { foo: 'bar', nested: { id: '123', baz: 'qux', deeper: { id: '456', quux: 'corge' } } };
    const result = preHandleCondition(condition);
    expect(result).toEqual({ foo: 'bar', nested: { _id: '123', baz: 'qux', deeper: { _id: '456', quux: 'corge' } } });
  });

  it('should handle empty object', () => {
    const condition = {};
    const result = preHandleCondition(condition);
    expect(result).toEqual(condition);
  });
});

describe('preHandleQuery function', () => {
  it('preHandleQuery returns an empty object when given an empty IMongoRequest', () => {
    const emptyRequest: IMongoRequest<any> = { condition: {}, keyword: '' };
    expect(preHandleQuery(emptyRequest)).toEqual({ deletedAt: { $eq: null } });
  });

  it('preHandleQuery returns the correct condition object without a keyword', () => {
    const query: IMongoRequest<any> = { condition: { id: 123 }, keyword: '' };
    expect(preHandleQuery(query)).toEqual({ _id: 123, deletedAt: { $eq: null } });
  });

  it('preHandleQuery returns the correct condition object with a keyword', () => {
    const query: IMongoRequest<any> = { condition: { id: 123 }, keyword: 'test' };
    expect(preHandleQuery(query)).toEqual({ _id: 123, $text: { $search: 'test' }, deletedAt: { $eq: null } });
  });

  it('preHandleQuery correctly handles conditions with $or', () => {
    const query: IMongoRequest<any> = {
      condition: { $or: [{ name: 'test' }, { email: 'test@test.com' }] },
      keyword: '',
    };
    expect(preHandleQuery(query)).toEqual({
      $or: [{ name: 'test' }, { email: 'test@test.com' }],
      deletedAt: { $eq: null },
    });
  });

  it('preHandleQuery correctly handles conditions with $and', () => {
    const query: IMongoRequest<any> = {
      condition: {
        $and: [{ name: 'test' }, { email: 'test@test.com' }],
      },
      keyword: '',
    };
    expect(preHandleQuery(query)).toEqual({
      $and: [{ name: 'test' }, { email: 'test@test.com' }],
      deletedAt: { $eq: null },
    });
  });
});
