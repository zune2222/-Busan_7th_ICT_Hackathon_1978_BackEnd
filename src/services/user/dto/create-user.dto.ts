import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

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
