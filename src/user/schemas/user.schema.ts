/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { FilmManagement } from './film.schema';
export const UserSchema = new mongoose.Schema({
  id: Number,
  email: String,
  password: String,
  name: String,
  FilmColection: FilmManagement,
});
