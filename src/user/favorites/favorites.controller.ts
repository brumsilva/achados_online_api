import { Controller, Post, Delete, Param, Body } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { User } from '../entities/user.entity';
import { AddFavoriteMovieDto } from '../dto/create-favorites.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  async addMovieToFavorite(
    @Param('userEmail') userEmail: string,
    @Body() movieDto: AddFavoriteMovieDto,
  ): Promise<User> {
    return this.favoritesService.addMovieToFavorites(userEmail, movieDto);
  }

  @Delete(':userEmail')
  async removeMovieFromFavorite(
    @Param('userEmail') userEmail: string,
    @Body() movieDto: AddFavoriteMovieDto,
  ): Promise<User> {
    return this.favoritesService.removeMovieFromFavorites(userEmail, movieDto);
  }
}
