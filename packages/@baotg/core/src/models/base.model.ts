export interface BaseModel {
  readonly _id?: string;
  readonly id?: string;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  readonly sqlId?: string;
  readonly createBy?: string;
  readonly updateBy?: string;
  readonly createDate?: Date;
  readonly lastUpdate?: Date;
}
