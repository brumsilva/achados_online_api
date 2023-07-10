import { Controller, Post, Delete, Param, Body } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { User } from '../entities/user.entity';
import { AddFavoriteMovieDto } from '../dto/create-favorites.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':email')
  async addMovieToFavorite(
    @Param('email') email: string,
    @Body() movieDto: AddFavoriteMovieDto,
  ): Promise<User> {
    return this.favoritesService.addMovieToFavorites(email, movieDto);
  }

  @Delete(':email')
  async removeMovieFromFavorite(
    @Param('email') email: string,
    @Body() movieDto: AddFavoriteMovieDto,
  ): Promise<User> {
    return this.favoritesService.removeMovieFromFavorites(email, movieDto);
  }
}
