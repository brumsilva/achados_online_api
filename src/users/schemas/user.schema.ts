/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { FilmManagement } from './film.schema';
export const UserSchema = new mongoose.Schema({
  id: Number,
  name: String,
  age: Number,
  username: String,
  password: String,
  FilmColection: [FilmManagement],
});
