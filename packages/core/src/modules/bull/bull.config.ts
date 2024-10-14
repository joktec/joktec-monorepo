import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsTypes } from '../../decorators/validators/is-type.decorator';
import { toArray } from '../../utils';

export class BullBoardConfig {
  @IsOptional()
  @IsBoolean()
  enable?: boolean = true;

  @IsOptional()
  @IsString()
  path?: string = 'bulls';

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  password?: string;

  constructor(props?: Partial<BullBoardConfig>) {
    Object.assign(this, props);
  }
}

export class BullConfig {
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  queue: string[];

  @IsNotEmpty()
  @IsString()
  host: string = 'localhost';

  @IsNotEmpty()
  @IsInt()
  port: number = 6379;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsInt()
  db?: number;

  @IsOptional()
  @IsTypes([BullBoardConfig])
  board?: BullBoardConfig;

  constructor(props: BullConfig) {
    Object.assign(this, {
      ...props,
      queue: toArray<string>(props?.queue, { split: ',' }),
      board: props?.board ? new BullBoardConfig(props.board) : null,
    });
  }
}
