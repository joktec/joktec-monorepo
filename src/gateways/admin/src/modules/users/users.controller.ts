import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  InternalServerErrorException,
  Next,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import {
  ListQuery,
  Query,
  UserMessagePattern,
  UserMicroserviceConfig,
} from '@baotg/core';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

import { PLURAL_NAME } from './users.constants';

const userMicroserviceConfig = new UserMicroserviceConfig();
@Controller(PLURAL_NAME)
export class UserController {
  constructor(
    @Inject(userMicroserviceConfig.name)
    private readonly userMicroservice: ClientProxy,
  ) {}

  @Get()
  async list(@Req() req: { myQuery: ListQuery }, @Res() res) {
    try {
      const objects = await firstValueFrom(
        this.userMicroservice.send(UserMessagePattern.LIST, {
          query: req.myQuery,
        }),
      );

      res.json(objects);
    } catch (err) {
      if (err.status === 'error') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException(err.message);
    }
  }

  @Get(':id')
  async get(
    @Param('id') id: string,
    @Req() req: { myQuery: Query },
    @Res() res,
    @Next() next,
  ) {
    try {
      const object = await firstValueFrom(
        this.userMicroservice.send(UserMessagePattern.GET, {
          id,
          query: req.myQuery,
        }),
      );

      return res.json(object);
    } catch (err) {
      if (err.status === 'error') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException(err.message);
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res) {
    try {
      const object = await firstValueFrom(
        this.userMicroservice.send(UserMessagePattern.CREATE, {
          body: createUserDto,
        }),
      );

      return res.json(object);
    } catch (err) {
      if (err.status === 'error') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException(err.message);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res,
    @Next() next,
  ) {
    try {
      const object = await firstValueFrom(
        this.userMicroservice.send(UserMessagePattern.UPDATE, {
          id,
          body: updateUserDto,
        }),
      );

      return res.json(object);
    } catch (err) {
      if (err.status === 'error') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException(err.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res, @Next() next) {
    try {
      const object = await firstValueFrom(
        this.userMicroservice.send(UserMessagePattern.DELETE, {
          id,
        }),
      );

      return res.json(object);
    } catch (err) {
      if (err.status === 'error') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException(err.message);
    }
  }
}
