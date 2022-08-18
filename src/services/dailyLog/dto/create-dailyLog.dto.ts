import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateDailyLogRequestDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  calendarId: number;

  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsNumber()
  progress: number;
}

export interface CreateDailyLogResponseDto {
  userId: number;
  calendarId: number;
  date: Date;
  progress: number;
}
