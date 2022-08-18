import { IsDate, IsString } from 'class-validator';

interface getProgress {
  _id: number;
  userId: number;
  calendarId: number;
  date: Date;
}

export interface GetProgressResponseDto extends Array<getProgress> {}
