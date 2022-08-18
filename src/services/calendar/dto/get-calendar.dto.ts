export interface GetCalendarResponseDto {
  _id: number;
  userId: number;
  month: number;
  like: number;
  dailyLogIds: Array<number>;
}
