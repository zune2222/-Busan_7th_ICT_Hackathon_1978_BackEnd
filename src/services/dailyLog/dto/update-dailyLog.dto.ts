import { IsDate, IsNumber, IsString } from 'class-validator';

export class UpdateDailyLogDto {
  @IsString()
  userId: string;

  @IsString()
  calendarId: string;

  @IsNumber()
  progress: number;
}
