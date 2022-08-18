export interface GetDailyLogResponseDto {
  _id: number;
  userId: number;
  calendarId: number;
  date: Date;
  progress: number;
}
