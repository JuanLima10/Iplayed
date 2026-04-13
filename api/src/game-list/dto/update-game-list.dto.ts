import { PartialType } from '@nestjs/swagger';
import { CreateGameListDto } from './create-game-list.dto';

export class UpdateGameListDto extends PartialType(CreateGameListDto) {}
