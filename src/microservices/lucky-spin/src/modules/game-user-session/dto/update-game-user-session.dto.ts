import { PartialType } from '@nestjs/mapped-types';
import { CreateGameUserSessionDto } from './create-game-user-session.dto';

export class UpdateGameUserSessionDto extends PartialType(CreateGameUserSessionDto) {
    id: string
}
