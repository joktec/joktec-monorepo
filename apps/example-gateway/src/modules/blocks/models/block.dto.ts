import { PickType } from '@joktec/core';
import { Block } from '../../../models/schemas';

export class BlockCreateDto extends PickType(Block, ['targetId', 'reasonIds', 'reasonText'] as const) {}
