import { Body, Delete, Get, Param, Post, Put, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ApiResponse } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { BaseDto, BaseListResponseDto } from '../dtos/base.dto';
import { BaseConditionInput, BaseCreateInput, BasePaginationInput, BaseQueryInput, BaseUpdateInput } from '../inputs';
import { IBaseController } from '../interfaces/base.controller.interface';

export class BaseController<
  VIEWDTO extends BaseDto,
  CREATEINPUT extends BaseCreateInput,
  UPDATEINPUT extends BaseUpdateInput,
  LIST_QUERY_INPUT extends BaseQueryInput<BaseConditionInput, BasePaginationInput>,
  LIST_VIEW_DTO extends BaseListResponseDto<BaseDto>,
> implements
    IBaseController<
      BaseDto,
      BaseCreateInput,
      BaseUpdateInput,
      BaseQueryInput<BaseConditionInput, BasePaginationInput>,
      BaseListResponseDto<BaseDto>
    >
{
  constructor(private readonly baseMicroservice: ClientProxy, private message: any) {}

  @Post('/query')
  @ApiResponse({
    status: 200,
  })
  async list(@Body() query: LIST_QUERY_INPUT): Promise<LIST_VIEW_DTO> {
    const { condition, pagination } = query;
    try {
      return await firstValueFrom(
        this.baseMicroservice.send(this.message.LIST, {
          condition,
          pagination,
        }),
      );
    } catch (err) {
      if (err.status === 'error') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException(err.message);
    }
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
  })
  async get(@Param('id') id: string): Promise<VIEWDTO> {
    try {
      const response = await firstValueFrom(this.baseMicroservice.send(this.message.GET, { id }));

      return response;
    } catch (err) {
      if (err.status === 'error') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException(err.message);
    }
  }

  @Post()
  @ApiResponse({
    status: 201,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  // tslint:disable-next-line:no-duplicate-string
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() input: CREATEINPUT): Promise<VIEWDTO> {
    try {
      const response = await firstValueFrom(
        this.baseMicroservice.send(this.message.CREATE, {
          input,
        }),
      );

      return response;
    } catch (err) {
      if (err.status === 'error') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException(err.message);
    }
  }

  @Put(':id')
  @ApiResponse({
    status: 201,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async update(@Body() input: UPDATEINPUT, @Param('id') id: string): Promise<VIEWDTO> {
    try {
      const response = await firstValueFrom(this.baseMicroservice.send(this.message.UPDATE, { id, input }));

      return response;
    } catch (err) {
      if (err.status === 'error') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException(err.message);
    }
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Entity deleted successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Entity does not exist' })
  async delete(@Param('id') id: string): Promise<VIEWDTO> {
    try {
      const response = await firstValueFrom(this.baseMicroservice.send(this.message.DELETE, { id }));

      return response;
    } catch (err) {
      if (err.status === 'error') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException(err.message);
    }
  }
}
