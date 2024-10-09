import { IsDateString, IsEnum, IsUppercase } from '@joktec/core';
import { BeforeInsert, BeforeUpdate, Column, Entity, MysqlModel, PrimaryGeneratedColumn } from '@joktec/mysql';
import { snakeCase, upperCase } from 'lodash';

export enum CronStatus {
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS',
  TODO = 'TODO',
}

@Entity('cron')
export class CronModel extends MysqlModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  @IsUppercase()
  type!: string;

  @Column({ type: 'varchar', length: 10 })
  @IsDateString()
  date!: string;

  @Column({ type: 'enum', enum: CronStatus, default: CronStatus.TODO })
  @IsEnum(CronStatus)
  status!: CronStatus;

  @Column({ type: 'json', default: {} })
  data!: Record<string, any>;

  @BeforeInsert()
  @BeforeUpdate()
  makeUpperCase() {
    this.type = upperCase(snakeCase(this.type));
  }
}
