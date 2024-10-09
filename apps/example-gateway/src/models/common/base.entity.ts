import { ApiPropertyOptional } from '@joktec/core';
import { Column, MysqlModel } from '@joktec/mysql';

export class BaseEntity extends MysqlModel {
  @Column({ type: 'varchar', length: 36, update: false, default: null })
  @ApiPropertyOptional({ readOnly: true })
  createdBy?: string;

  @Column({ type: 'varchar', length: 36, update: true, default: null })
  @ApiPropertyOptional({ readOnly: true })
  updatedBy?: string;
}
