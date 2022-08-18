export interface GetCalendarAllDto {
  userId: number;
  month: number;
  like: number;
}

export interface GetCalendarAllResponseDto extends Array<GetCalendarAllDto> {}
