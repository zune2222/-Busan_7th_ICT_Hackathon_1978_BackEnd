import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

export class CreateUserRequestDto {
  @IsString()
  loginId: string;

  @IsNumber()
  userId: number;

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
  _id: number;
  loginId: string;
  userId: number;
  job: Number;
  major: number;
  gender: number;
  birthDay: Date;
}
