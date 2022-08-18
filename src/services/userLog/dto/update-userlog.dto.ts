import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class UpdateUserLogRequestDto {
  @IsNumber()
  _id: number;

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
