export interface GetUserLogResponseDto {
  _id: number;
  userId: string;
  dailyLogId: string;
  startTime: Date;
  endTime: Date;
  position: number;
}
