import {
  AllowNull,
  BeforeCreate,
  BeforeUpdate,
  Column,
  CreatedAt,
  DataType,
  Default,
  Is,
  IsUppercase,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from '@baotg/mysql';
import { snakeCase, upperCase } from 'lodash';

export enum CronStatus {
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS',
  TODO = 'TODO',
}

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

@Table({ tableName: 'cron', timestamps: true, underscored: true, paranoid: false })
export class Cron extends Model<Cron> {
  @PrimaryKey
  id!: string;

  @Column(DataType.STRING(255))
  @AllowNull(false)
  @IsUppercase
  type!: string;

  @Column(DataType.STRING(10))
  @AllowNull(false)
  @Is(DATE_REGEX)
  date!: string;

  @Column(DataType.ENUM(...Object.values(CronStatus)))
  @AllowNull(false)
  @Default(CronStatus.TODO)
  status!: CronStatus;

  @Column(DataType.JSON)
  @Default({})
  data!: Record<string, any>;

  @CreatedAt
  createdAt?: Date;

  @UpdatedAt
  updatedAt?: Date;

  @BeforeUpdate
  @BeforeCreate
  static makeUpperCase(instance: Cron) {
    instance.type = upperCase(snakeCase(instance.type));
  }
}
