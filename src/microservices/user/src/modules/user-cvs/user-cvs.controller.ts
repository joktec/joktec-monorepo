import { Controller } from '@nestjs/common';
import { ListQuery, Query } from '@jobhopin/core';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { UserCv, UserCvMessagePattern } from '@jobhopin/core';

import { UserCvService } from './user-cvs.service';
import { PLURAL_NAME } from './user-cvs.constants';

@Controller(PLURAL_NAME)
export class UserCvController {
  constructor(private readonly userCvService: UserCvService) {}

  @MessagePattern(UserCvMessagePattern.USER_USER_CV_LIST)
  async list(params: { query: ListQuery }) {
    try {
      const { query } = params;
    
      const [items, total] = await Promise.all([
        this.userCvService.findAll(query),
        this.userCvService.count(query),
      ]);

      return {
        items,
        total,
      };
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(UserCvMessagePattern.USER_USER_CV_GET)
  async get(params: { id: string, query: Query }) {
    try {
      const { query, id } = params;

      const object = await this.userCvService.findById(id, query);
      if (!object) {
        throw new RpcException('Resource not found');
      }

      return object;
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(UserCvMessagePattern.USER_USER_CV_CREATE)
  async create(params: { body: UserCv }) {
    try {
      const { body } = params;

      return await this.userCvService.create(body);
    } catch (err) {
      throw new RpcException(err.message);
    }
  }


  @MessagePattern(UserCvMessagePattern.USER_USER_CV_UPDATE)
  async update(params: { id: string, body: UserCv }) {
    try {
      const { id, body } = params;
      

      const object = await this.userCvService.findById(id);
      if (!object) {
        throw new RpcException('Resource not found');
      }

      return await this.userCvService.update(id, body);
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(UserCvMessagePattern.USER_USER_CV_DELETE)
  async delete(params: { id: string }) {
    try {
      const { id } = params;

      const object = await this.userCvService.findById(id);
      if (!object) {
        throw new RpcException('Resource not found');
      }

      return await this.userCvService.remove(id);
    } catch (err) {
      throw new RpcException(err.message);
    }
  }
}