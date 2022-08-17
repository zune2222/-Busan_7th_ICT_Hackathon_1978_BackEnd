import { IsDate, IsString } from 'class-validator';

interface getProgress {
  _id: number;
  userId: string;
  calendarId: string;
  date: Date;
}

export interface GetProgressResponseDto extends Array<getProgress> {}
