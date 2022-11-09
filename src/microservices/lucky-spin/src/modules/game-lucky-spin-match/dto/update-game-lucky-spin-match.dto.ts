import { PartialType } from '@nestjs/mapped-types';
import { CreateGameLuckySpinMatchDto } from './create-game-lucky-spin-match.dto';

export class UpdateGameLuckySpinMatchDto extends PartialType(CreateGameLuckySpinMatchDto) {
    id: string
}
