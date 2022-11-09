import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from './../../service/base.service';
import { Injectable } from '@nestjs/common';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService extends BaseService<Users> {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {
    super(usersRepository);
  }
}
