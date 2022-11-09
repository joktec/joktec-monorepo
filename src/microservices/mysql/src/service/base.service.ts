import { DeleteResult, Repository } from 'typeorm';
import { IBaseService } from '../interfaces/base.service.interface';
import { EntityId } from 'typeorm/repository/EntityId';
import { InjectRepository } from '@nestjs/typeorm';

export class BaseService<T> implements IBaseService<T> {
  constructor(
    @InjectRepository('' as any)
    private repository: Repository<T>,
  ) {}

  findAll(): Promise<T[]> {
    return this.repository.find();
  }

  findById(id: EntityId): Promise<T> {
    return this.repository.findOneById(id);
  }

  findOne(condition: any): Promise<T> {
    return this.repository.findOneBy(condition);
  }

  findBy(condition: any): Promise<T[]> {
    return this.repository.findBy(condition);
  }

  count(condition: any): Promise<number> {
    return this.repository.countBy(condition);
  }

  async create(data: any): Promise<T> {
    return this.repository.save(data);
  }

  async update(id: EntityId, data: any): Promise<T> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: EntityId): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
