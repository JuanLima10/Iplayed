import { PartialType } from '@nestjs/swagger';
import { CreateGameStatusDto } from './create-game-status.dto';

export class UpdateGameStatusDto extends PartialType(CreateGameStatusDto) {}
