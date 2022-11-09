import { PartialType } from '@nestjs/mapped-types';
import { CreateGameLuckySpinDto } from './create-game-lucky-spin.dto';

export class UpdateGameLuckySpinDto extends PartialType(CreateGameLuckySpinDto) {
    id: string
}
