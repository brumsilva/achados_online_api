/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
export class FilmManagement extends Document {
  name: string;
  liked: boolean;
}