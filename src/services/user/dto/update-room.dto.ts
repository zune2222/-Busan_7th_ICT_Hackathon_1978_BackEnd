import { IsString } from 'class-validator';

export class UpdateRoomRequestDto {
  room: Array<Array<number>>;
}
