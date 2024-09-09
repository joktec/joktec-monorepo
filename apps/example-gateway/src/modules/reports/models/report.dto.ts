import { PickType } from '@joktec/core';
import { Report } from '../../../models/schemas';

export class ReportCreateDto extends PickType(Report, ['target', 'targetId', 'reasonIds', 'reasonText'] as const) {}
