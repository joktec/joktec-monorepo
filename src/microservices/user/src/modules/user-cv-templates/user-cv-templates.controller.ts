import { Controller } from '@nestjs/common';
import { ListQuery, Query } from '@jobhopin/core';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { UserCvTemplate, UserCvTemplateMessagePattern } from '@jobhopin/core';

import { UserCvTemplateService } from './user-cv-templates.service';
import { PLURAL_NAME } from './user-cv-templates.constants';

@Controller(PLURAL_NAME)
export class UserCvTemplateController {
  constructor(private readonly userCvTemplateService: UserCvTemplateService) {}

  @MessagePattern(UserCvTemplateMessagePattern.USER_USER_CV_TEMPLATE_LIST)
  async list(params: { query: ListQuery }) {
    try {
      const { query } = params;
    
      const [items, total] = await Promise.all([
        this.userCvTemplateService.findAll(query),
        this.userCvTemplateService.count(query),
      ]);

      return {
        items,
        total,
      };
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(UserCvTemplateMessagePattern.USER_USER_CV_TEMPLATE_GET)
  async get(params: { id: string, query: Query }) {
    try {
      const { query, id } = params;

      const object = await this.userCvTemplateService.findById(id, query);
      if (!object) {
        throw new RpcException('Resource not found');
      }

      return object;
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(UserCvTemplateMessagePattern.USER_USER_CV_TEMPLATE_CREATE)
  async create(params: { body: UserCvTemplate }) {
    try {
      const { body } = params;

      return await this.userCvTemplateService.create(body);
    } catch (err) {
      throw new RpcException(err.message);
    }
  }


  @MessagePattern(UserCvTemplateMessagePattern.USER_USER_CV_TEMPLATE_UPDATE)
  async update(params: { id: string, body: UserCvTemplate }) {
    try {
      const { id, body } = params;
      

      const object = await this.userCvTemplateService.findById(id);
      if (!object) {
        throw new RpcException('Resource not found');
      }

      return await this.userCvTemplateService.update(id, body);
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(UserCvTemplateMessagePattern.USER_USER_CV_TEMPLATE_DELETE)
  async delete(params: { id: string }) {
    try {
      const { id } = params;

      const object = await this.userCvTemplateService.findById(id);
      if (!object) {
        throw new RpcException('Resource not found');
      }

      return await this.userCvTemplateService.remove(id);
    } catch (err) {
      throw new RpcException(err.message);
    }
  }
}