import { IsNumber } from 'class-validator';

export class UpdateCalendarRequestDto {
  @IsNumber()
  month: Number;

  @IsNumber()
  like: Number;
}
