import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../entities/user.entity';
import { Movie } from '../entities/movie.entity';
import { AddFavoriteMovieDto } from '../dto/create-favorites.dto';

@Injectable()
export class FavoritesService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async addMovieToFavorites(
    email: string,
    movieDto: AddFavoriteMovieDto,
  ): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMovieAlreadyAdded = user.favoriteMovies.some(
      (favMovie) => favMovie.id === movieDto.id,
    );
    if (isMovieAlreadyAdded) {
      throw new ConflictException('O Filme Já está na lista de favoritos');
    }

    const movie: Movie = { ...movieDto };
    user.favoriteMovies.push(movie);
    return user.save();
  }

  async removeMovieFromFavorites(email: string, movie: Movie): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException('O usuario nao foi encontrado.');
    }
    user.favoriteMovies = user.favoriteMovies.filter(
      (favMovie) => favMovie.id !== movie.id,
    );
    return user.save();
  }
}
