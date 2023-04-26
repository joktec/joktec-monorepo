import { describe, expect, it } from '@jest/globals';
import {
  convertPopulate,
  preHandleBody,
  preHandleCondition,
  preHandleQuery,
  preHandleUpdateBody,
  projection,
} from '../mongo.utils';
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

describe('preHandleBody function', () => {
  it('should remove _id, createdAt, updatedAt, deletedAt fields', () => {
    const input = {
      _id: '123',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
      name: 'John Doe',
      age: 30,
    };
    const output: any = preHandleBody(input);
    expect(output._id).toBeUndefined();
    expect(output.createdAt).toBeUndefined();
    expect(output.updatedAt).toBeUndefined();
    expect(output.deletedAt).toBeUndefined();
    expect(output.name).toEqual('John Doe');
    expect(output.age).toEqual(30);
  });

  it('should convert lng and lat fields to location field', () => {
    const input = {
      _id: '123',
      lng: '-122.4194',
      lat: '37.7749',
      name: 'San Francisco',
    };
    const output: any = preHandleBody(input);
    expect(output.lng).toBeUndefined();
    expect(output.lat).toBeUndefined();
    expect(output.location).toEqual({
      type: 'Point',
      coordinates: [-122.4194, 37.7749],
    });
    expect(output.name).toEqual('San Francisco');
  });

  it('should handle empty input', () => {
    const input = {};
    const output = preHandleBody(input);
    expect(output).toEqual({});
  });
});

describe('preHandleUpdateBody function', () => {
  it('should remove unnecessary fields and transform location fields', () => {
    const input = {
      _id: '123',
      name: 'Test',
      age: 25,
      lat: '1.23',
      lng: '4.56',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      address: { city: 'New York', state: 'NY', country: 'USA' },
      'address.city': 'LA',
      'address.zipCode': '12345',
    };

    const output = preHandleUpdateBody(input);
    expect(output).toEqual({
      name: 'Test',
      age: 25,
      'location.type': 'Point',
      'location.coordinates': [4.56, 1.23],
      'address.state': 'NY',
      'address.country': 'USA',
      'address.city': 'LA',
      'address.zipCode': '12345',
    });
  });

  it('should handle nested objects', () => {
    const input = {
      _id: '123',
      name: 'Test',
      age: 25,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      address: {
        city: 'New York',
        state: 'NY',
        country: 'USA',
        zipCode: '12345',
        nested: { field: 'value' },
      },
    };

    const output = preHandleUpdateBody(input);
    expect(output).toEqual({
      name: 'Test',
      age: 25,
      'address.state': 'NY',
      'address.country': 'USA',
      'address.nested.field': 'value',
      'address.city': 'New York',
      'address.zipCode': '12345',
    });
  });

  it('should handle fields with "$" character', () => {
    const input = {
      _id: '123',
      name: 'Test',
      age: 25,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      $set: { 'address.city': 'LA', 'address.zipCode': '12345' },
    };

    const output = preHandleUpdateBody(input);

    expect(output).toEqual({
      name: 'Test',
      age: 25,
      $set: { 'address.city': 'LA', 'address.zipCode': '12345' },
    });
  });
});

describe('projection', () => {
  it('should return a string with spaces instead of commas', () => {
    const select = 'name,age,address.city';
    const result = projection(select);
    expect(result).toEqual('name age address.city');
  });

  it('should return an empty string if select is empty', () => {
    const select = '';
    const result = projection(select);
    expect(result).toEqual('');
  });
});

describe('convertPopulate function', () => {
  it('should convert populate object to mongoose populate options', () => {
    const populate = {
      author: {
        model: 'User',
        select: 'name',
        populate: {
          comments: {
            model: 'Comment',
            select: 'text',
            populate: {
              user: {
                model: 'User',
                select: 'email',
              },
            },
          },
        },
      },
    };

    const expected = [
      {
        path: 'author',
        model: 'User',
        select: 'name',
        populate: [
          {
            path: 'comments',
            model: 'Comment',
            select: 'text',
            populate: [{ path: 'user', model: 'User', select: 'email' }],
          },
        ],
      },
    ];

    const result = convertPopulate<any>(populate);
    expect(result).toEqual(expected);
  });

  it('should return empty array when populate object is empty', () => {
    const result = convertPopulate();
    expect(result).toEqual([]);
  });
});
