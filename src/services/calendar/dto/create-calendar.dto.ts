import { IsNumber } from 'class-validator';

export class CreateCalendarRequestDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  month: number;

  @IsNumber()
  like: number;
}

export interface CreateCalendarResponseDto {
  _id: number;
  userId: number;
  month: number;
  like: number;
}
