import { IsNumber, IsString } from 'class-validator';

export class CreateCalendarRequestDto {
  @IsString()
  userId: string;

  @IsNumber()
  month: Number;

  @IsNumber()
  like: Number;
}

export interface CreateCalendarResponseDto {
  userId: string;
  month: Number;
  like: Number;
}
