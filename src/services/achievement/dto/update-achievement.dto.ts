import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class UpdateAchievementRequestDto {
  @IsNumber()
  _id: number;

  @IsNumber()
  userId: number;

  @IsString()
  dailyLogId: number;

  @IsString()
  title: string;

  @Type(() => Date)
  @IsDate()
  startTime: Date;

  @Type(() => Date)
  @IsDate()
  endTime: Date;

  @IsNumber()
  progress: number;
}
