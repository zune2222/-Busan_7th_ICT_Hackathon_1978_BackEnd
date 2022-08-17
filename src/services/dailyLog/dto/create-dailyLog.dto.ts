import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateDailyLogRequestDto {
  @IsString()
  userId: string;

  @IsString()
  calendarId: string;

  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsNumber()
  progress: number;
}

export interface CreateDailyLogResponseDto {
  userId: string;
  calendarId: string;
  date: Date;
  progress: number;
}
