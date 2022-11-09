import { Controller } from '@nestjs/common';
import { ListQuery, Query } from '@jobhopin/core';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { UserLocation, UserLocationMessagePattern } from '@jobhopin/core';

import { UserLocationService } from './user-locations.service';
import { PLURAL_NAME } from './user-locations.constants';

@Controller(PLURAL_NAME)
export class UserLocationController {
  constructor(private readonly userLocationService: UserLocationService) {}

  @MessagePattern(UserLocationMessagePattern.USER_USER_LOCATION_LIST)
  async list(params: { query: ListQuery }) {
    try {
      const { query } = params;
    
      const [items, total] = await Promise.all([
        this.userLocationService.findAll(query),
        this.userLocationService.count(query),
      ]);

      return {
        items,
        total,
      };
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(UserLocationMessagePattern.USER_USER_LOCATION_GET)
  async get(params: { id: string, query: Query }) {
    try {
      const { query, id } = params;

      const object = await this.userLocationService.findById(id, query);
      if (!object) {
        throw new RpcException('Resource not found');
      }

      return object;
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(UserLocationMessagePattern.USER_USER_LOCATION_CREATE)
  async create(params: { body: UserLocation }) {
    try {
      const { body } = params;

      return await this.userLocationService.create(body);
    } catch (err) {
      throw new RpcException(err.message);
    }
  }


  @MessagePattern(UserLocationMessagePattern.USER_USER_LOCATION_UPDATE)
  async update(params: { id: string, body: UserLocation }) {
    try {
      const { id, body } = params;
      

      const object = await this.userLocationService.findById(id);
      if (!object) {
        throw new RpcException('Resource not found');
      }

      return await this.userLocationService.update(id, body);
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(UserLocationMessagePattern.USER_USER_LOCATION_DELETE)
  async delete(params: { id: string }) {
    try {
      const { id } = params;

      const object = await this.userLocationService.findById(id);
      if (!object) {
        throw new RpcException('Resource not found');
      }

      return await this.userLocationService.remove(id);
    } catch (err) {
      throw new RpcException(err.message);
    }
  }
}