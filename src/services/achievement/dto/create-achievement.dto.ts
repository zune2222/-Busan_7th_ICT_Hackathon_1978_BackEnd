import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateAchievementRequestDto {
  @IsNumber()
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
  position: number;
}

export interface CreateAchievementResponseDto {
  _id: number;
  userId: number;
  dailyLogId: number;
  title: string;
  startTime: Date;
  endTime: Date;
  progress: number;
  position: number;
}
