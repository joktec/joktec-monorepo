import { describe, expect, it } from '@jest/globals';
import { MongoHelper } from '../helpers';
import { ICondition } from '@joktec/core';
import { ObjectId } from '../models';

describe('MongoHelper class', () => {
  describe('flatten function', () => {
    it('should flattening a simple object without nesting', () => {
      const condition: ICondition<any> = {
        _id: '507f1f77bcf86cd799439011',
        parentId: new ObjectId('656c096ad77a68cf9c495e28'),
        name: 'Alice',
        age: 25,
      };
      const result = MongoHelper.flatten(condition);
      expect(result).toMatchObject({
        _id: ObjectId.create('507f1f77bcf86cd799439011'),
        parentId: ObjectId.create('656c096ad77a68cf9c495e28'),
        name: 'Alice',
        age: 25,
      });
    });

    it('should flattening an object with nested properties', () => {
      const condition: ICondition<any> = {
        person: { name: 'Bob', age: null, birthday: new Date() },
        location: { city: 'Los Angeles', state: null },
      };
      const result = MongoHelper.flatten(condition);
      expect(result).toMatchObject({
        'person.name': 'Bob',
        'person.age': null,
        'person.birthday': expect.any(Date),
        'location.city': 'Los Angeles',
        'location.state': null,
      });
    });

    it('should flattening an object with null values', () => {
      const condition: ICondition<any> = {
        name: null,
        address: { street: null, city: 'Chicago' },
      };
      const result = MongoHelper.flatten(condition);
      expect(result).toEqual({
        name: null,
        'address.street': null,
        'address.city': 'Chicago',
      });
    });

    it('should flattening an object with Mongoose operators', () => {
      const condition: ICondition<any> = {
        title: 'John Doe',
        author: {
          user: {
            age: { $gte: 18 },
            deletedAt: null,
          },
        },
      };
      const result = MongoHelper.flatten(condition);
      expect(result).toEqual({
        title: 'John Doe',
        'author.user.age': { $gte: 18 },
        'author.user.deletedAt': null,
      });
    });
  });

  describe('parseFilter function', () => {
    it('should handle empty object', () => {
      const condition: any = {};
      const result = MongoHelper.parseFilter(condition);
      expect(result).toEqual(condition);
    });

    it('should not modify a simple condition', () => {
      const result = MongoHelper.parseFilter({
        status: 'activated',
        $text: { $search: 'Tìm đồ' },
        parentId: '656c096ad77a68cf9c495e28',
      });
      const condition = {
        status: 'activated',
        $text: { $search: 'Tìm đồ' },
        parentId: ObjectId.create('656c096ad77a68cf9c495e28'),
      };
      expect(result).toEqual(condition);
    });

    it('should handle nested objects', () => {
      const condition: any = {
        _id: '123',
        foo: 'bar',
        nested: { _id: '123', baz: 'qux', foo: 'foo1', deeper: { _id: '456', foo: 'foo1', quux: 'corge' } },
        'nested.foo': 'foo',
        'nested.deeper.foo': 'foo',
      };
      const result = MongoHelper.parseFilter(condition);
      expect(result).toEqual({
        _id: '123',
        foo: 'bar',
        'nested.foo': 'foo',
        'nested._id': '123',
        'nested.baz': 'qux',
        'nested.deeper._id': '456',
        'nested.deeper.quux': 'corge',
        'nested.deeper.foo': 'foo',
      });
    });

    it('should handle complex objects', () => {
      const condition = {
        type: 'service',
        status: 'activated',
        deletedAt: { $eq: null },
        name: { $like: 'jo' },
        nullableValue: { $nil: true },
        defaultValue: { $empty: true },
        date: new Date(),
        regex: /foo/i,
        nested: {
          _id: '123',
          foo: 'foo1',
          name: { $begin: 'jo' },
          deeper: {
            _id: '456',
            foo: { $eq: 'foo1' },
            name: { $end: 'jo' },
            num: { $gte: 789 },
          },
        },
        'nested.foo': { $eq: 'foo' },
        'nested.deeper.foo': { $eq: 'foo' },
      };

      const result = MongoHelper.parseFilter(condition);

      expect(result).toEqual({
        type: 'service',
        status: 'activated',
        deletedAt: { $eq: null },
        name: { $regex: /jo/i },
        nullableValue: null,
        defaultValue: '',
        date: condition.date,
        regex: condition.regex,
        'nested._id': '123',
        'nested.name': { $regex: /^jo/i },
        'nested.deeper._id': '456',
        'nested.deeper.name': { $regex: /jo$/i },
        'nested.deeper.num': { $gte: 789 },
        'nested.foo': { $eq: 'foo' },
        'nested.deeper.foo': { $eq: 'foo' },
      });
    });
  });

  describe('parsePopulate function', () => {
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
              populate: [
                {
                  path: 'user',
                  model: 'User',
                  select: 'email',
                },
              ],
            },
          ],
        },
      ];

      const result = MongoHelper.parsePopulate<any>(populate);
      expect(result).toEqual(expected);
    });

    it('should return empty array when populate object is empty', () => {
      const result = MongoHelper.parsePopulate();
      expect(result).toEqual([]);
    });
  });
});
