import { IsDate, IsNumber, IsString } from 'class-validator';

export class UpdateDailyLogDto {
  @IsString()
  userId: number;

  @IsString()
  calendarId: number;

  @IsNumber()
  progress: number;
}
