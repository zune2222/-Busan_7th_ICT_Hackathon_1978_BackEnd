import { IsNumber, IsString } from 'class-validator';

export class CreateCalendarRequestDto {
  @IsString()
  userId: string;

  @IsNumber()
  month: number;

  @IsNumber()
  like: number;
}

export interface CreateCalendarResponseDto {
  _id: number;
  userId: string;
  month: number;
  like: number;
}
