import { IsString } from 'class-validator';

export class UpdateRoomRequestDto {
  @IsString()
  room: string;
}

export interface UpdateRoomResponseDto {
  room: string;
}
