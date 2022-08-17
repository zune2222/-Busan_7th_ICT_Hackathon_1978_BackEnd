interface GetAllDto {
  _id: number;
  id: string;
}

export interface GetAllResponseDto extends Array<GetAllDto> {}
