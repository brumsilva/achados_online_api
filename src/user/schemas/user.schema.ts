/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { Movie } from '../entities/movie.entity';
export const UserSchema = new mongoose.Schema({
  id: Number,
  email: String,
  password: String,
  name: String,
  favoriteMovies: Array<Movie>,
});
