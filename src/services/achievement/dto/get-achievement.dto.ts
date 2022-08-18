export interface GetAchievementResponseDto {
  _id: number;
  userId: number;
  dailyLogId: number;
  title: string;
  startTime: Date;
  endTime: Date;
  progress: number;
  position: number;
}
