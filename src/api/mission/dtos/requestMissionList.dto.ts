import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class RequestMissionListDto {
  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsString()
  @IsOptional()
  order?: 'date'; // TODO: 인기순 추가

  @IsNumber()
  @IsOptional()
  due?: number;

  @IsNumber({}, { each: true })
  @IsOptional()
  categories?: number[];

  @IsString()
  @IsOptional()
  keyword?: string;
}
