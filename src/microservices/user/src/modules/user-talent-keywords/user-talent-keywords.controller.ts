import { Controller } from '@nestjs/common';
import { ListQuery, Query } from '@jobhopin/core';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { UserTalentKeyword, UserTalentKeywordMessagePattern } from '@jobhopin/core';

import { UserTalentKeywordService } from './user-talent-keywords.service';
import { PLURAL_NAME } from './user-talent-keywords.constants';

@Controller(PLURAL_NAME)
export class UserTalentKeywordController {
  constructor(private readonly userTalentKeywordService: UserTalentKeywordService) {}

  @MessagePattern(UserTalentKeywordMessagePattern.USER_USER_TALENT_KEYWORD_LIST)
  async list(params: { query: ListQuery }) {
    try {
      const { query } = params;
    
      const [items, total] = await Promise.all([
        this.userTalentKeywordService.findAll(query),
        this.userTalentKeywordService.count(query),
      ]);

      return {
        items,
        total,
      };
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(UserTalentKeywordMessagePattern.USER_USER_TALENT_KEYWORD_GET)
  async get(params: { id: string, query: Query }) {
    try {
      const { query, id } = params;

      const object = await this.userTalentKeywordService.findById(id, query);
      if (!object) {
        throw new RpcException('Resource not found');
      }

      return object;
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(UserTalentKeywordMessagePattern.USER_USER_TALENT_KEYWORD_CREATE)
  async create(params: { body: UserTalentKeyword }) {
    try {
      const { body } = params;

      return await this.userTalentKeywordService.create(body);
    } catch (err) {
      throw new RpcException(err.message);
    }
  }


  @MessagePattern(UserTalentKeywordMessagePattern.USER_USER_TALENT_KEYWORD_UPDATE)
  async update(params: { id: string, body: UserTalentKeyword }) {
    try {
      const { id, body } = params;
      

      const object = await this.userTalentKeywordService.findById(id);
      if (!object) {
        throw new RpcException('Resource not found');
      }

      return await this.userTalentKeywordService.update(id, body);
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(UserTalentKeywordMessagePattern.USER_USER_TALENT_KEYWORD_DELETE)
  async delete(params: { id: string }) {
    try {
      const { id } = params;

      const object = await this.userTalentKeywordService.findById(id);
      if (!object) {
        throw new RpcException('Resource not found');
      }

      return await this.userTalentKeywordService.remove(id);
    } catch (err) {
      throw new RpcException(err.message);
    }
  }
}