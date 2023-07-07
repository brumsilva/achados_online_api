/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
export const FilmManagement = new mongoose.Schema({
  name: String,
  liked: Boolean,
});
