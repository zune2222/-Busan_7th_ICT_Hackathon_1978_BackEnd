export interface GetCalendarAllDto {
  userId: string;
  month: number;
  like: number;
}

export interface GetCalendarAllResponseDto extends Array<GetCalendarAllDto> {}
