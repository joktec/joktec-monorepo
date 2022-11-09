import { EntityId } from 'typeorm/repository/EntityId';
import { DeleteResult } from 'typeorm';

export interface IBaseService<T> {
  findAll(): Promise<T[]>;

  findById(id: EntityId): Promise<T>;

  findOne(condition: any): Promise<T>;

  findBy(condition: any): Promise<T[]>;

  create(data: any): Promise<T>;

  update(id: EntityId, data: any): Promise<T>;

  delete(id: EntityId): Promise<DeleteResult>;
}
