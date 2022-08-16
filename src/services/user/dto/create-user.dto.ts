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

  @IsDate()
  birthDay: Date;
}

export interface CreateUserResponseDto {
  id: string;
  password: string;
  job: Number;
  major: number;
  gender: number;
  birthDay: Date;
}
