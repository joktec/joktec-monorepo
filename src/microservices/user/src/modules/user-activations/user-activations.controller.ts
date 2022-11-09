import { Controller } from '@nestjs/common';
import { ListQuery, Query } from '@jobhopin/core';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { UserActivation, UserActivationMessagePattern } from '@jobhopin/core';

import { UserActivationService } from './user-activations.service';
import { PLURAL_NAME } from './user-activations.constants';

@Controller(PLURAL_NAME)
export class UserActivationController {
  constructor(private readonly userActivationService: UserActivationService) {}

  @MessagePattern(UserActivationMessagePattern.USER_USER_ACTIVATION_LIST)
  async list(params: { query: ListQuery }) {
    try {
      const { query } = params;
    
      const [items, total] = await Promise.all([
        this.userActivationService.findAll(query),
        this.userActivationService.count(query),
      ]);

      return {
        items,
        total,
      };
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(UserActivationMessagePattern.USER_USER_ACTIVATION_GET)
  async get(params: { id: string, query: Query }) {
    try {
      const { query, id } = params;

      const object = await this.userActivationService.findById(id, query);
      if (!object) {
        throw new RpcException('Resource not found');
      }

      return object;
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(UserActivationMessagePattern.USER_USER_ACTIVATION_CREATE)
  async create(params: { body: UserActivation }) {
    try {
      const { body } = params;

      return await this.userActivationService.create(body);
    } catch (err) {
      throw new RpcException(err.message);
    }
  }


  @MessagePattern(UserActivationMessagePattern.USER_USER_ACTIVATION_UPDATE)
  async update(params: { id: string, body: UserActivation }) {
    try {
      const { id, body } = params;
      

      const object = await this.userActivationService.findById(id);
      if (!object) {
        throw new RpcException('Resource not found');
      }

      return await this.userActivationService.update(id, body);
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(UserActivationMessagePattern.USER_USER_ACTIVATION_DELETE)
  async delete(params: { id: string }) {
    try {
      const { id } = params;

      const object = await this.userActivationService.findById(id);
      if (!object) {
        throw new RpcException('Resource not found');
      }

      return await this.userActivationService.remove(id);
    } catch (err) {
      throw new RpcException(err.message);
    }
  }
}