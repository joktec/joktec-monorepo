import { describe, expect, it } from '@jest/globals';
import {
  convertPopulate,
  preHandleBody,
  preHandleCondition,
  preHandleQuery,
  preHandleUpdateBody,
  buildProjection,
  buildSorter,
} from '../mongo.utils';
import { IMongoRequest } from '../models';
import { ISort } from '@joktec/core';

describe('preHandleCondition function', () => {
  it('should not modify a simple condition', () => {
    const condition: any = { foo: 'bar' };
    const result = preHandleCondition(condition);
    expect(result).toEqual(condition);
  });

  it('should replace "id" key with "_id"', () => {
    const condition: any = { id: '123', foo: 'bar' };
    const result = preHandleCondition(condition);
    expect(result).toEqual({ _id: '123', foo: 'bar' });
  });

  it('should handle nested objects', () => {
    const condition: any = { foo: 'bar', nested: { id: '123', baz: 'qux' } };
    const result = preHandleCondition(condition);
    expect(result).toEqual({ foo: 'bar', nested: { _id: '123', baz: 'qux' } });
  });

  it('should handle multiple nested objects', () => {
    const condition: any = { foo: 'bar', nested: { id: '123', baz: 'qux', deeper: { id: '456', quux: 'corge' } } };
    const result = preHandleCondition(condition);
    expect(result).toEqual({ foo: 'bar', nested: { _id: '123', baz: 'qux', deeper: { _id: '456', quux: 'corge' } } });
  });

  it('should handle empty object', () => {
    const condition: any = {};
    const result = preHandleCondition(condition);
    expect(result).toEqual(condition);
  });

  it('should handle if have null value', () => {
    const condition: any = {
      type: 'service',
      status: 'activated',
      deletedAt: {
        $eq: null,
      },
    };
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
  const body = {
    _id: '123',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
    __v: 1,
    __t: 'MyType',
    name: 'John',
    age: 30,
    address: {
      _id: '123',
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
      __v: 1,
      __t: 'MyType',
    },
    tags: ['foo', 'bar', 'baz'],
    items: [
      { _id: '123', name: 'Item 1', quantity: 2, createdAt: new Date(), updatedAt: new Date(), deletedAt: new Date() },
      { _id: '456', name: 'Item 2', quantity: 3, createdAt: new Date(), updatedAt: new Date(), deletedAt: new Date() },
    ],
  };

  it('should remove specified fields from body', () => {
    const processed = preHandleBody(body);
    expect(processed).not.toHaveProperty('_id');
    expect(processed).not.toHaveProperty('createdAt');
    expect(processed).not.toHaveProperty('updatedAt');
    expect(processed).not.toHaveProperty('deletedAt');
    expect(processed).not.toHaveProperty('__v');
    expect(processed).not.toHaveProperty('__t');
  });

  it('should handle nested objects', () => {
    const processed: any = preHandleBody(body);
    expect(processed).toHaveProperty('address');
    expect(processed.address).toHaveProperty('street');
    expect(processed.address).toHaveProperty('city');
    expect(processed.address).toHaveProperty('state');
    expect(processed.address).toHaveProperty('zip');

    expect(processed.address).not.toHaveProperty('_id');
    expect(processed.address).not.toHaveProperty('createdAt');
    expect(processed.address).not.toHaveProperty('updatedAt');
    expect(processed.address).not.toHaveProperty('deletedAt');
    expect(processed.address).not.toHaveProperty('__v');
    expect(processed.address).not.toHaveProperty('__t');
  });

  it('should handle arrays of objects', () => {
    const processed: any = preHandleBody(body);
    expect(processed).toHaveProperty('items');
    expect(processed.items.length).toBe(2);
    expect(processed.items[0]).toHaveProperty('name');
    expect(processed.items[0]).toHaveProperty('quantity');
    expect(processed.items[0]).not.toHaveProperty('_id');
    expect(processed.items[0]).not.toHaveProperty('createdAt');
    expect(processed.items[0]).not.toHaveProperty('updatedAt');
    expect(processed.items[0]).not.toHaveProperty('deletedAt');
    expect(processed.items[0]).not.toHaveProperty('__v');
    expect(processed.items[0]).not.toHaveProperty('__t');

    expect(processed.items[1]).toHaveProperty('name');
    expect(processed.items[1]).toHaveProperty('quantity');
  });

  it('should skip null and undefined values', () => {
    const bodyWithNull = { ...body, nullValue: null };
    const bodyWithUndefined = { ...body, undefinedValue: undefined };
    const processedWithNull = preHandleBody(bodyWithNull);
    const processedWithUndefined = preHandleBody(bodyWithUndefined);
    expect(processedWithNull).toHaveProperty('nullValue');
    expect(processedWithUndefined).toHaveProperty('undefinedValue');
  });

  it('should return a partial object', () => {
    const processed = preHandleBody(body);
    expect(processed).toMatchObject({
      name: 'John',
      age: 30,
      address: {},
      tags: ['foo', 'bar', 'baz'],
      items: [
        { name: 'Item 1', quantity: 2 },
        { name: 'Item 2', quantity: 3 },
      ],
    });
  });

  it('should handle empty input', () => {
    const input = {};
    const output = preHandleBody(input);
    expect(output).toEqual({});
  });
});

describe('preHandleUpdateBody function', () => {
  it('should remove unwanted fields and convert object to dot notation', () => {
    const body = {
      _id: '1234',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
      __v: 1,
      __t: 'MyModel',
      name: 'John Doe',
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      },
      'address.state': 'CA',
      tags: ['tag3', 'tag4'],
      items: [
        { name: 'item1', price: 10, createdAt: new Date(), updatedAt: new Date(), deletedAt: new Date() },
        { name: 'item2', price: 20, createdAt: new Date(), updatedAt: new Date(), deletedAt: new Date() },
      ],
    };

    const expected = {
      $set: {
        name: 'John Doe',
        'address.street': '123 Main St',
        'address.city': 'New York',
        'address.zip': '10001',
        'address.state': 'CA',
        tags: ['tag3', 'tag4'],
        items: [
          { name: 'item1', price: 10 },
          { name: 'item2', price: 20 },
        ],
      },
    };

    const result = preHandleUpdateBody(body);

    expect(result).toEqual(expected);
  });

  it('should remove unwanted fields and convert object to dot notation with $set', () => {
    const body = {
      $set: {
        _id: '1234',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
        __v: 1,
        __t: 'MyModel',
        name: 'John Doe',
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zip: '10001',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: new Date(),
        },
        'address.state': 'CA',
        tags: ['tag3', 'tag4'],
        items: [
          { name: 'item1', price: 10, createdAt: new Date(), updatedAt: new Date(), deletedAt: new Date() },
          { name: 'item2', price: 20, createdAt: new Date(), updatedAt: new Date(), deletedAt: new Date() },
        ],
      },
    };

    const expected = {
      $set: {
        name: 'John Doe',
        'address.street': '123 Main St',
        'address.city': 'New York',
        'address.state': 'CA',
        'address.zip': '10001',
        tags: ['tag3', 'tag4'],
        items: [
          { name: 'item1', price: 10 },
          { name: 'item2', price: 20 },
        ],
      },
    };

    const result = preHandleUpdateBody(body);

    expect(result).toEqual(expected);
  });

  it('should combine with exist $set', () => {
    const body = {
      name: 'John Doe',
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zip: '10001',
      },
      'address.state': 'CA',
      tags: ['tag3', 'tag4'],
      items: [
        { name: 'item1', price: 10 },
        { name: 'item2', price: 20 },
      ],
      $set: {
        address: { zip: '10002' },
        'address.city': 'New York City',
      },
    };

    const expected = {
      $set: {
        name: 'John Doe',
        'address.street': '123 Main St',
        'address.city': 'New York City',
        'address.state': 'CA',
        'address.zip': '10002',
        tags: ['tag3', 'tag4'],
        items: [
          { name: 'item1', price: 10 },
          { name: 'item2', price: 20 },
        ],
      },
    };

    const result = preHandleUpdateBody(body);

    expect(result).toEqual(expected);
  });

  it('should put into $set when met $push', () => {
    const body = {
      name: 'John Doe',
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zip: '10001',
      },
      'address.state': 'CA',
      tags: ['tag3', 'tag4'],
      items: [
        { name: 'item1', price: 10 },
        { name: 'item2', price: 20 },
      ],
      $push: {
        tags: 'tag5',
      },
    };

    const expected = {
      $set: {
        name: 'John Doe',
        'address.street': '123 Main St',
        'address.city': 'New York',
        'address.state': 'CA',
        'address.zip': '10001',
        tags: ['tag3', 'tag4'],
        items: [
          { name: 'item1', price: 10 },
          { name: 'item2', price: 20 },
        ],
      },
      $push: {
        tags: 'tag5',
      },
    };

    const result = preHandleUpdateBody(body);

    expect(result).toEqual(expected);
  });
});

describe('buildProjection function', () => {
  it('should return a mongo projection to includes some fields', () => {
    const select = 'name,age,address.city';
    const result = buildProjection(select);
    expect(result).toEqual({ name: 1, age: 1, 'address.city': 1 });
  });

  it('should return a mongo projection to includes and excludes some fields', () => {
    const select = 'name,-age,address.city';
    const result = buildProjection(select);
    expect(result).toEqual({ name: 1, age: 0, 'address.city': 1 });
  });

  it('should return an empty object if select is empty', () => {
    const select = '';
    const result = buildProjection(select);
    expect(result).toEqual({});
  });
});

describe('buildSorter function', () => {
  it('should return a mongo sorter structure', () => {
    const sort: ISort = { name: 'asc', createdAt: 'desc' };
    const result = buildSorter(sort);
    expect(result).toEqual({ name: 1, createdAt: -1 });
  });

  it('should return an empty object if select is empty', () => {
    const result = buildSorter({});
    expect(result).toEqual({});
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
        match: { deletedAt: { $eq: null } },
        path: 'author',
        model: 'User',
        select: { name: 1 },
        populate: [
          {
            match: { deletedAt: { $eq: null } },
            path: 'comments',
            model: 'Comment',
            select: { text: 1 },
            populate: [
              {
                match: { deletedAt: { $eq: null } },
                path: 'user',
                model: 'User',
                select: { email: 1 },
              },
            ],
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
