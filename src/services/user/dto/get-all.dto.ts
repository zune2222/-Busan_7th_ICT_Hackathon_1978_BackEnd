interface GetAllDto {
  _id: Number;
  id: string;
}

export interface GetAllResponseDto extends Array<GetAllDto> {}
