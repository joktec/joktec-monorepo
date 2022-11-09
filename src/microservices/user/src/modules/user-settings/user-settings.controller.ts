import { Controller } from '@nestjs/common';
import { ListQuery, Query } from '@jobhopin/core';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { UserSetting, UserSettingMessagePattern } from '@jobhopin/core';

import { UserSettingService } from './user-settings.service';
import { PLURAL_NAME } from './user-settings.constants';

@Controller(PLURAL_NAME)
export class UserSettingController {
  constructor(private readonly userSettingService: UserSettingService) {}

  @MessagePattern(UserSettingMessagePattern.USER_USER_SETTING_LIST)
  async list(params: { query: ListQuery }) {
    try {
      const { query } = params;
    
      const [items, total] = await Promise.all([
        this.userSettingService.findAll(query),
        this.userSettingService.count(query),
      ]);

      return {
        items,
        total,
      };
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(UserSettingMessagePattern.USER_USER_SETTING_GET)
  async get(params: { id: string, query: Query }) {
    try {
      const { query, id } = params;

      const object = await this.userSettingService.findById(id, query);
      if (!object) {
        throw new RpcException('Resource not found');
      }

      return object;
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(UserSettingMessagePattern.USER_USER_SETTING_CREATE)
  async create(params: { body: UserSetting }) {
    try {
      const { body } = params;

      return await this.userSettingService.create(body);
    } catch (err) {
      throw new RpcException(err.message);
    }
  }


  @MessagePattern(UserSettingMessagePattern.USER_USER_SETTING_UPDATE)
  async update(params: { id: string, body: UserSetting }) {
    try {
      const { id, body } = params;
      

      const object = await this.userSettingService.findById(id);
      if (!object) {
        throw new RpcException('Resource not found');
      }

      return await this.userSettingService.update(id, body);
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(UserSettingMessagePattern.USER_USER_SETTING_DELETE)
  async delete(params: { id: string }) {
    try {
      const { id } = params;

      const object = await this.userSettingService.findById(id);
      if (!object) {
        throw new RpcException('Resource not found');
      }

      return await this.userSettingService.remove(id);
    } catch (err) {
      throw new RpcException(err.message);
    }
  }
}