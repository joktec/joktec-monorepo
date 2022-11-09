import { Controller } from '@nestjs/common';
import { ListQuery, Query } from '@jobhopin/core';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { UserEmailVerification, UserEmailVerificationMessagePattern } from '@jobhopin/core';

import { UserEmailVerificationService } from './user-email-verifications.service';
import { PLURAL_NAME } from './user-email-verifications.constants';

@Controller(PLURAL_NAME)
export class UserEmailVerificationController {
  constructor(private readonly userEmailVerificationService: UserEmailVerificationService) {}

  @MessagePattern(UserEmailVerificationMessagePattern.USER_USER_EMAIL_VERIFICATION_LIST)
  async list(params: { query: ListQuery }) {
    try {
      const { query } = params;
    
      const [items, total] = await Promise.all([
        this.userEmailVerificationService.findAll(query),
        this.userEmailVerificationService.count(query),
      ]);

      return {
        items,
        total,
      };
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(UserEmailVerificationMessagePattern.USER_USER_EMAIL_VERIFICATION_GET)
  async get(params: { id: string, query: Query }) {
    try {
      const { query, id } = params;

      const object = await this.userEmailVerificationService.findById(id, query);
      if (!object) {
        throw new RpcException('Resource not found');
      }

      return object;
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(UserEmailVerificationMessagePattern.USER_USER_EMAIL_VERIFICATION_CREATE)
  async create(params: { body: UserEmailVerification }) {
    try {
      const { body } = params;

      return await this.userEmailVerificationService.create(body);
    } catch (err) {
      throw new RpcException(err.message);
    }
  }


  @MessagePattern(UserEmailVerificationMessagePattern.USER_USER_EMAIL_VERIFICATION_UPDATE)
  async update(params: { id: string, body: UserEmailVerification }) {
    try {
      const { id, body } = params;
      

      const object = await this.userEmailVerificationService.findById(id);
      if (!object) {
        throw new RpcException('Resource not found');
      }

      return await this.userEmailVerificationService.update(id, body);
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @MessagePattern(UserEmailVerificationMessagePattern.USER_USER_EMAIL_VERIFICATION_DELETE)
  async delete(params: { id: string }) {
    try {
      const { id } = params;

      const object = await this.userEmailVerificationService.findById(id);
      if (!object) {
        throw new RpcException('Resource not found');
      }

      return await this.userEmailVerificationService.remove(id);
    } catch (err) {
      throw new RpcException(err.message);
    }
  }
}