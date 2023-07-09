/* eslint-disable prettier/prettier */
import { Movie } from "./movie.entity";

export class User {
  id?: number;
  email: string;
  password: string;
  name: string;
  favoriteMovies?: Movie[];	
}
