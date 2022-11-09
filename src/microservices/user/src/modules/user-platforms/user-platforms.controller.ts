import { Controller } from '@nestjs/common';
import { ListQuery, Query } from '@jobhopin/core';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { UserPlatform, UserPlatformMessagePattern } from '@jobhopin/core';

import { UserPlatformService } from './user-platforms.service';
import { PLURAL_NAME } from './user-platforms.constants';

@Controller(PLURAL_NAME)
export class UserPlatformController {
  constructor(private readonly userPlatformService: UserPlatformService) {}

  @MessagePattern(UserPlatformMessagePattern.USER_USER_PLATFORM_LIST)
  async list(params: { query: ListQuery }) {
    try {
      const { query } = params;
    
      const [items, total] = await Promise.all([
        this.userPlatformService.findAll(query),
        this.userPlatformService.count(query),
      ]);

      return {
        items,
        total,
      };
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(UserPlatformMessagePattern.USER_USER_PLATFORM_GET)
  async get(params: { id: string, query: Query }) {
    try {
      const { query, id } = params;

      const object = await this.userPlatformService.findById(id, query);
      if (!object) {
        throw new RpcException('Resource not found');
      }

      return object;
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(UserPlatformMessagePattern.USER_USER_PLATFORM_CREATE)
  async create(params: { body: UserPlatform }) {
    try {
      const { body } = params;

      return await this.userPlatformService.create(body);
    } catch (err) {
      throw new RpcException(err.message);
    }
  }


  @MessagePattern(UserPlatformMessagePattern.USER_USER_PLATFORM_UPDATE)
  async update(params: { id: string, body: UserPlatform }) {
    try {
      const { id, body } = params;
      

      const object = await this.userPlatformService.findById(id);
      if (!object) {
        throw new RpcException('Resource not found');
      }

      return await this.userPlatformService.update(id, body);
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(UserPlatformMessagePattern.USER_USER_PLATFORM_DELETE)
  async delete(params: { id: string }) {
    try {
      const { id } = params;

      const object = await this.userPlatformService.findById(id);
      if (!object) {
        throw new RpcException('Resource not found');
      }

      return await this.userPlatformService.remove(id);
    } catch (err) {
      throw new RpcException(err.message);
    }
  }
}