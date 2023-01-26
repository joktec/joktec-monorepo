import {
  ClassTransformOptions,
  Expose,
  instanceToPlain,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  plainToInstance,
  Transform,
} from '@baotg/core';
import { MysqlMapper } from '@baotg/mysql';

export enum CronStatus {
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS',
  TODO = 'TODO',
}

@Expose({ name: 'cron' })
export class Cron {
  constructor(payload: Partial<Cron>) {
    Object.assign(this, { ...payload });
  }

  @Expose({ name: 'id' })
  @IsNotEmpty()
  @IsString()
  id!: string;

  @Expose({ name: 'type' })
  @IsNotEmpty()
  @IsString()
  type!: string;

  @Expose({ name: 'date' })
  @IsNotEmpty()
  @IsDate()
  date!: string;

  @Expose({ name: 'status' })
  @IsNotEmpty()
  @Transform(({ value }) => CronStatus[value])
  status: CronStatus;

  @Expose({ name: 'data' })
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value || '{}'), { toClassOnly: true })
  @Transform(({ value }) => JSON.stringify(value || {}), { toPlainOnly: true })
  data: object;

  @Expose({ name: 'created_at' })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @Expose({ name: 'updated_at' })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}

export class CronMapper extends MysqlMapper<Cron> {
  toPersistence = (domainModel: Cron, opts?: ClassTransformOptions) =>
    instanceToPlain<Cron>(new Cron(domainModel), opts);
  toDomain = (persistenceModel: any, opts?: ClassTransformOptions): Cron =>
    plainToInstance<Cron, any>(Cron, persistenceModel, opts);
}
