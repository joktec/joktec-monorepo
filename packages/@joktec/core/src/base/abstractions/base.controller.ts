import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BaseService } from './base.service';
import { IBaseRequest, IListResponseDto } from '../models';
import { ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export abstract class BaseController<T, ID> {
  protected constructor(protected service: BaseService<T, ID>) {}

  @Get('/')
  @ApiOperation({ summary: 'List' })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  async findAll(@Body() req: IBaseRequest): Promise<IListResponseDto<T>> {
    return this.service.findAll(req);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async findOne(@Param('id') id: ID): Promise<T> {
    return this.service.findOne(id);
  }

  @Post('/')
  @ApiOperation({ summary: 'Create' })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  async create(@Body() entity: T): Promise<T> {
    return this.service.create(entity);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  async update(@Param('id') id: ID, @Body() entity: T): Promise<T> {
    return this.service.update(id, entity);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  async delete(@Param('id') id: ID): Promise<T> {
    return this.service.delete(id);
  }
}
