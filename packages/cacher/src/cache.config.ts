import {
  buildError,
  ClientConfig,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsTypes,
  toInt,
} from '@joktec/core';
import { validateSync, ValidationError } from '@joktec/core/dist/validation';

export interface CacheableOption {
  key?: 'auto' | string;
  expiry?: number;
  conId?: string;
}

export interface CacheEvictOption {
  key?: 'auto' | string;
  allEntries?: boolean;
  conId?: string;
}

export enum CacheType {
  LOCAL = 'local',
  REDIS = 'redis',
  MEMCACHED = 'memcached',
}

export class CacheConfig extends ClientConfig {
  @IsEnum(CacheType)
  @IsNotEmpty()
  type?: CacheType = CacheType.LOCAL;

  @IsString({ groups: [CacheType.LOCAL] })
  @IsNotEmpty({ groups: [CacheType.LOCAL] })
  cacheDir?: string;

  @IsString({ groups: [CacheType.REDIS, CacheType.MEMCACHED] })
  @IsNotEmpty({ groups: [CacheType.REDIS, CacheType.MEMCACHED] })
  host!: string;

  @IsInt({ groups: [CacheType.REDIS, CacheType.MEMCACHED] })
  @IsNotEmpty({ groups: [CacheType.REDIS, CacheType.MEMCACHED] })
  port!: number;

  @IsOptional({ groups: [CacheType.REDIS] })
  @IsString({ groups: [CacheType.REDIS] })
  username?: string;

  @IsOptional({ groups: [CacheType.REDIS] })
  @IsTypes(['string', 'int'], { groups: [CacheType.REDIS] })
  password?: string;

  @IsOptional({ groups: [CacheType.REDIS] })
  @IsInt({ groups: [CacheType.REDIS] })
  database?: number;

  @IsOptional({ groups: [CacheType.REDIS] })
  @IsBoolean({ groups: [CacheType.REDIS] })
  readonly?: boolean;

  @IsOptional({ groups: [CacheType.LOCAL, CacheType.REDIS] })
  @IsInt({ groups: [CacheType.LOCAL, CacheType.REDIS] })
  retryTimeout?: number;

  @IsOptional({ groups: [CacheType.LOCAL, CacheType.REDIS] })
  @IsInt({ groups: [CacheType.LOCAL, CacheType.REDIS] })
  connectTimeout?: number;

  @IsOptional({ groups: [CacheType.LOCAL, CacheType.REDIS] })
  @IsInt({ groups: [CacheType.LOCAL, CacheType.REDIS] })
  maxConnections?: number;

  constructor(props: CacheConfig) {
    super(props);
    Object.assign(this, {
      ...props,
      retryTimeout: toInt(props?.retryTimeout, 20000),
      connectTimeout: toInt(props?.connectTimeout, 20000),
    });
  }

  validate(): string[] {
    const errors: ValidationError[] = validateSync(this, { groups: [this.type] });
    if (!errors.length) return null;
    const formatError = buildError(errors);
    return Object.values(formatError).flat();
  }
}
