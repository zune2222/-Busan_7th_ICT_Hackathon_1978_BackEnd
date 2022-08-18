import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateUserLogRequestDto {
  @IsString()
  userId: string;

  @IsString()
  dailyLogId: string;

  @Type(() => Date)
  @IsDate()
  startTime: Date;

  @Type(() => Date)
  @IsDate()
  endTime: Date;

  @IsNumber()
  position: number;
}

export interface CreateUserLogResponseDto {
  _id: number;
  userId: string;
  dailyLogId: string;
  startTime: Date;
  endTime: Date;
  position: number;
}
