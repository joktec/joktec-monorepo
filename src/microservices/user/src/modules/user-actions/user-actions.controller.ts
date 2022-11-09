import { Controller } from '@nestjs/common';
import { ListQuery, Query } from '@jobhopin/core';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { UserAction, UserActionMessagePattern } from '@jobhopin/core';

import { UserActionService } from './user-actions.service';
import { PLURAL_NAME } from './user-actions.constants';

@Controller(PLURAL_NAME)
export class UserActionController {
  constructor(private readonly userActionService: UserActionService) {}

  @MessagePattern(UserActionMessagePattern.USER_USER_ACTION_LIST)
  async list(params: { query: ListQuery }) {
    try {
      const { query } = params;
    
      const [items, total] = await Promise.all([
        this.userActionService.findAll(query),
        this.userActionService.count(query),
      ]);

      return {
        items,
        total,
      };
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(UserActionMessagePattern.USER_USER_ACTION_GET)
  async get(params: { id: string, query: Query }) {
    try {
      const { query, id } = params;

      const object = await this.userActionService.findById(id, query);
      if (!object) {
        throw new RpcException('Resource not found');
      }

      return object;
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(UserActionMessagePattern.USER_USER_ACTION_CREATE)
  async create(params: { body: UserAction }) {
    try {
      const { body } = params;

      return await this.userActionService.create(body);
    } catch (err) {
      throw new RpcException(err.message);
    }
  }


  @MessagePattern(UserActionMessagePattern.USER_USER_ACTION_UPDATE)
  async update(params: { id: string, body: UserAction }) {
    try {
      const { id, body } = params;
      

      const object = await this.userActionService.findById(id);
      if (!object) {
        throw new RpcException('Resource not found');
      }

      return await this.userActionService.update(id, body);
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(UserActionMessagePattern.USER_USER_ACTION_DELETE)
  async delete(params: { id: string }) {
    try {
      const { id } = params;

      const object = await this.userActionService.findById(id);
      if (!object) {
        throw new RpcException('Resource not found');
      }

      return await this.userActionService.remove(id);
    } catch (err) {
      throw new RpcException(err.message);
    }
  }
}