interface Community {
  _id: number;
  userId: number;
  month: number;
  like: number;
}

export interface GetCommunityResponseDto extends Array<Community> {}
