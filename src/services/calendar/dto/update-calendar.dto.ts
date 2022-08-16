import { IsNumber } from 'class-validator';

export class UpdateCalendarRequestDto {
  @IsNumber()
  month: number;

  @IsNumber()
  like: number;
}
