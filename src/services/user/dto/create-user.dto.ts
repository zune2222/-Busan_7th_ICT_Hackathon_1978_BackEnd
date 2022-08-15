import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateUserRequestDto {
  @IsString()
  id: string;

  @IsString()
  password: string;

  @IsNumber()
  job: Number;

  @IsNumber()
  major: Number;

  @IsNumber()
  gender: Number;

  @IsDate()
  birthDay: Date;
}

export interface CreateUserResponseDto {
  id: string;
  password: string;
  job: Number;
  major: Number;
  gender: Number;
  birthDay: Date;
}
