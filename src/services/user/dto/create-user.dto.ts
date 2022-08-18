import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

export class CreateUserRequestDto {
  @IsString()
  id: string;

  @IsString()
  password: string;

  @IsNumber()
  job: number;

  @IsNumber()
  major: number;

  @IsNumber()
  gender: number;

  @Type(() => Date)
  @IsDate()
  birthDay: Date;

  @IsString()
  nickname: string;

  @IsString()
  room: string;

  @IsBoolean()
  visible: boolean;
}

export interface CreateUserResponseDto {
  id: string;
  job: Number;
  major: number;
  gender: number;
  birthDay: Date;
}
