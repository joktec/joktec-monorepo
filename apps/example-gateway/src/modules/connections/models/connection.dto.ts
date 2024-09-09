import { PickType } from '@joktec/core';
import { Connection } from '../../../models/schemas';

export class ConnectionCreateDto extends PickType(Connection, ['followerId'] as const) {}
