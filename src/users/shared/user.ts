/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
import { FilmManagement } from './Film';
export class User extends Document {
  _id: string;
  name: string;
  age: number;
  username: string;
  password: string;
  FilmColection: FilmManagement;
}
