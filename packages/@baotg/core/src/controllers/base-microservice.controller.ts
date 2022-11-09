import { MessagePattern, RpcException } from '@nestjs/microservices';

import { NotFoundException } from '@nestjs/common';
import { BaseService } from '../services';

export const BaseMicroserviceController = (messagePattern: any): any => {
  class BaseController {
    constructor(private readonly baseService: BaseService<any>) {}

    @MessagePattern(messagePattern.LIST)
    async query(params: any) {
      try {
        const { condition, pagination } = params;
        return await this.baseService.query(condition, pagination);
      } catch (err) {
        throw new RpcException(err.message);
      }
    }

    @MessagePattern(messagePattern.GET)
    async get(params: any): Promise<any> {
      try {
        const { id } = params;
        return await this.baseService.findById(id);
      } catch (err) {
        throw new RpcException(err.message);
      }
    }

    @MessagePattern(messagePattern.CREATE)
    async create(params: any): Promise<any> {
      try {
        const { input } = params;
        return await this.baseService.create(input);
      } catch (err) {
        throw new RpcException(err.message);
      }
    }

    @MessagePattern(messagePattern.UPDATE)
    async update(params: any): Promise<any> {
      try {
        const { id, input } = params;
        return await this.baseService.update(id, input);
      } catch (err) {
        throw new RpcException(err.message);
      }
    }

    @MessagePattern(messagePattern.DELETE)
    async delete(params: any): Promise<any> {
      try {
        const { id } = params;
        return await this.baseService.remove(id);
      } catch (err) {
        throw new RpcException(err.message);
      }
    }

    @MessagePattern(messagePattern.BATCH_GET_IDS)
    getDataLoader(params: any): Promise<any> {
      const { ids } = params;
      return this.baseService.batchGetIds(ids);
    }
  }

  return BaseController;
};
