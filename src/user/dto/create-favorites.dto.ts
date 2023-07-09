import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddFavoriteMovieDto {
  @IsBoolean()
  adult: boolean;

  @IsString()
  backdrop_path: string;

  @IsNumber({}, { each: true })
  genre_ids: number[];

  @IsNumber()
  id: number;

  @IsString()
  original_language: string;

  @IsString()
  original_title: string;

  @IsString()
  overview: string;

  @IsNumber()
  popularity: number;

  @IsString()
  poster_path: string;

  @IsString()
  release_date: string;

  @IsString()
  title: string;

  @IsBoolean()
  video: boolean;

  @IsNumber()
  vote_average: number;

  @IsNumber()
  vote_count: number;
}
