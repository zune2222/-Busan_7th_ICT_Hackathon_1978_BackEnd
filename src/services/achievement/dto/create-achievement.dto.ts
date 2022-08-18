import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateAchievementRequestDto {
  @IsString()
  dailyLogId: string;

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

export interface CreateAchievementResponseDto {
  _id: number;
  dailyLogId: string;
  title: string;
  startTime: Date;
  endTime: Date;
  progress: number;
}
