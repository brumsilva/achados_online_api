import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { User } from '../entities/user.entity';
import { Movie } from '../entities/movie.entity';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { AddFavoriteMovieDto } from '../dto/create-favorites.dto';

const mockUserModel = {
  findOne: jest.fn().mockResolvedValue(null),
  exec: jest.fn(),
};

describe('FavoritesController', () => {
  let controller: FavoritesController;
  let service: FavoritesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoritesController],
      providers: [
        FavoritesService,
        {
          provide: getModelToken('User'),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    controller = module.get<FavoritesController>(FavoritesController);
    service = module.get<FavoritesService>(FavoritesService);
  });

  describe('addMovieToFavorite', () => {
    it('should add a movie to favorites successfully', async () => {
      const email = 'brumsillva@gmail.com';
      const movieDto: AddFavoriteMovieDto = {
        adult: false,
        backdrop_path: '/oqP1qEZccq5AD9TVTIaO6IGUj7o.jpg',
        genre_ids: [14, 28, 12],
        id: 455476,
        original_language: 'en',
        original_title: 'Knights of the Zodiac',
        overview:
          'Quando um órfão de rua teimoso em busca de sua irmã sequestrada involuntariamente toca em poderes ocultos, ele descobre que pode ser a única pessoa viva que pode proteger uma deusa reencarnada, enviada para vigiar a humanidade. Ele só se tornará um Cavaleiro do Zodíaco quando puder deixar sua irmã ir e abraçar seu destino.',
        popularity: 3963.447,
        poster_path:
          'https://image.tmdb.org/t/p/w500/1qos0X6EIi4KT9RmJiVGZB9Kw6l.jpg',
        release_date: '2023-04-27',
        title: 'Os Cavaleiros do Zodíaco - Saint Seiya: O Começo',
        video: false,
        vote_average: 6.5,
        vote_count: 367,
      };

      const user = new User();
      user.favoriteMovies = [];

      jest.spyOn(service, 'addMovieToFavorites').mockResolvedValue(user);

      const result = await controller.addMovieToFavorite(email, movieDto);

      expect(service.addMovieToFavorites).toHaveBeenCalledWith(email, movieDto);
      expect(result).toEqual(user);
    });

    it('should throw NotFoundException when user is not found', async () => {
      const email = 'brumsillva@gmail.com';
      const movieDto: AddFavoriteMovieDto = {
        adult: false,
        backdrop_path: '/oqP1qEZccq5AD9TVTIaO6IGUj7o.jpg',
        genre_ids: [14, 28, 12],
        id: 455476,
        original_language: 'en',
        original_title: 'Knights of the Zodiac',
        overview:
          'Quando um órfão de rua teimoso em busca de sua irmã sequestrada involuntariamente toca em poderes ocultos, ele descobre que pode ser a única pessoa viva que pode proteger uma deusa reencarnada, enviada para vigiar a humanidade. Ele só se tornará um Cavaleiro do Zodíaco quando puder deixar sua irmã ir e abraçar seu destino.',
        popularity: 3963.447,
        poster_path:
          'https://image.tmdb.org/t/p/w500/1qos0X6EIi4KT9RmJiVGZB9Kw6l.jpg',
        release_date: '2023-04-27',
        title: 'Os Cavaleiros do Zodíaco - Saint Seiya: O Começo',
        video: false,
        vote_average: 6.5,
        vote_count: 367,
      };

      jest
        .spyOn(service, 'addMovieToFavorites')
        .mockRejectedValue(new NotFoundException('User not found'));

      await expect(
        controller.addMovieToFavorite(email, movieDto),
      ).rejects.toThrowError(NotFoundException);
    });

    it('should throw ConflictException when movie is already in favorites', async () => {
      const email = 'brumsillva@gmail.com';
      const movieDto: AddFavoriteMovieDto = {
        adult: false,
        backdrop_path: '/oqP1qEZccq5AD9TVTIaO6IGUj7o.jpg',
        genre_ids: [14, 28, 12],
        id: 455476,
        original_language: 'en',
        original_title: 'Knights of the Zodiac',
        overview:
          'Quando um órfão de rua teimoso em busca de sua irmã sequestrada involuntariamente toca em poderes ocultos, ele descobre que pode ser a única pessoa viva que pode proteger uma deusa reencarnada, enviada para vigiar a humanidade. Ele só se tornará um Cavaleiro do Zodíaco quando puder deixar sua irmã ir e abraçar seu destino.',
        popularity: 3963.447,
        poster_path:
          'https://image.tmdb.org/t/p/w500/1qos0X6EIi4KT9RmJiVGZB9Kw6l.jpg',
        release_date: '2023-04-27',
        title: 'Os Cavaleiros do Zodíaco - Saint Seiya: O Começo',
        video: false,
        vote_average: 6.5,
        vote_count: 367,
      };

      jest
        .spyOn(service, 'addMovieToFavorites')
        .mockRejectedValue(
          new ConflictException('O Filme Já está na lista de favoritos'),
        );

      await expect(
        controller.addMovieToFavorite(email, movieDto),
      ).rejects.toThrowError(ConflictException);
    });
  });

  describe('removeMovieFromFavorite', () => {
    it('should remove a movie from favorites successfully', async () => {
      const email = 'brumsillva@gmail.com';
      const movie: Movie = {
        adult: false,
        backdrop_path: '/oqP1qEZccq5AD9TVTIaO6IGUj7o.jpg',
        genre_ids: [14, 28, 12],
        id: 455476,
        original_language: 'en',
        original_title: 'Knights of the Zodiac',
        overview:
          'Quando um órfão de rua teimoso em busca de sua irmã sequestrada involuntariamente toca em poderes ocultos, ele descobre que pode ser a única pessoa viva que pode proteger uma deusa reencarnada, enviada para vigiar a humanidade. Ele só se tornará um Cavaleiro do Zodíaco quando puder deixar sua irmã ir e abraçar seu destino.',
        popularity: 3963.447,
        poster_path:
          'https://image.tmdb.org/t/p/w500/1qos0X6EIi4KT9RmJiVGZB9Kw6l.jpg',
        release_date: '2023-04-27',
        title: 'Os Cavaleiros do Zodíaco - Saint Seiya: O Começo',
        video: false,
        vote_average: 6.5,
        vote_count: 367,
      };

      const user = new User();
      user.favoriteMovies = [movie];

      jest.spyOn(service, 'removeMovieFromFavorites').mockResolvedValue(user);

      const result = await controller.removeMovieFromFavorite(email, movie);

      expect(service.removeMovieFromFavorites).toHaveBeenCalledWith(
        email,
        movie,
      );
      expect(result).toEqual(user);
    });

    it('should throw NotFoundException when user is not found', async () => {
      const email = 'brumsillva@gmail.com';
      const movie: Movie = {
        adult: false,
        backdrop_path: '/oqP1qEZccq5AD9TVTIaO6IGUj7o.jpg',
        genre_ids: [14, 28, 12],
        id: 455476,
        original_language: 'en',
        original_title: 'Knights of the Zodiac',
        overview:
          'Quando um órfão de rua teimoso em busca de sua irmã sequestrada involuntariamente toca em poderes ocultos, ele descobre que pode ser a única pessoa viva que pode proteger uma deusa reencarnada, enviada para vigiar a humanidade. Ele só se tornará um Cavaleiro do Zodíaco quando puder deixar sua irmã ir e abraçar seu destino.',
        popularity: 3963.447,
        poster_path:
          'https://image.tmdb.org/t/p/w500/1qos0X6EIi4KT9RmJiVGZB9Kw6l.jpg',
        release_date: '2023-04-27',
        title: 'Os Cavaleiros do Zodíaco - Saint Seiya: O Começo',
        video: false,
        vote_average: 6.5,
        vote_count: 367,
      };

      jest
        .spyOn(service, 'removeMovieFromFavorites')
        .mockRejectedValue(
          new NotFoundException('O usuario nao foi encontrado.'),
        );

      await expect(
        controller.removeMovieFromFavorite(email, movie),
      ).rejects.toThrowError(NotFoundException);
    });
  });
});

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoritesService,
        {
          provide: getModelToken('User'),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<FavoritesService>(FavoritesService);
  });

  describe('addMovieToFavorites', () => {
    it('should add a movie to favorites successfully', async () => {
      const email = 'brumsillva@gmail.com';
      const movieDto: AddFavoriteMovieDto = {
        adult: false,
        backdrop_path: '/oqP1qEZccq5AD9TVTIaO6IGUj7o.jpg',
        genre_ids: [14, 28, 12],
        id: 455476,
        original_language: 'en',
        original_title: 'Knights of the Zodiac',
        overview:
          'Quando um órfão de rua teimoso em busca de sua irmã sequestrada involuntariamente toca em poderes ocultos, ele descobre que pode ser a única pessoa viva que pode proteger uma deusa reencarnada, enviada para vigiar a humanidade. Ele só se tornará um Cavaleiro do Zodíaco quando puder deixar sua irmã ir e abraçar seu destino.',
        popularity: 3963.447,
        poster_path:
          'https://image.tmdb.org/t/p/w500/1qos0X6EIi4KT9RmJiVGZB9Kw6l.jpg',
        release_date: '2023-04-27',
        title: 'Os Cavaleiros do Zodíaco - Saint Seiya: O Começo',
        video: false,
        vote_average: 6.5,
        vote_count: 367,
      };

      const user = new User();
      user.favoriteMovies = [];

      jest.spyOn(mockUserModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(user),
      });

      const result = await service.addMovieToFavorites(email, movieDto);

      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email });
      expect(result).toEqual(user);
      expect(user.favoriteMovies).toEqual([movieDto]);
    });

    it('should throw NotFoundException when user is not found', async () => {
      const email = 'brumsillva@gmail.com';
      const movieDto: AddFavoriteMovieDto = {
        adult: false,
        backdrop_path: '/oqP1qEZccq5AD9TVTIaO6IGUj7o.jpg',
        genre_ids: [14, 28, 12],
        id: 455476,
        original_language: 'en',
        original_title: 'Knights of the Zodiac',
        overview:
          'Quando um órfão de rua teimoso em busca de sua irmã sequestrada involuntariamente toca em poderes ocultos, ele descobre que pode ser a única pessoa viva que pode proteger uma deusa reencarnada, enviada para vigiar a humanidade. Ele só se tornará um Cavaleiro do Zodíaco quando puder deixar sua irmã ir e abraçar seu destino.',
        popularity: 3963.447,
        poster_path:
          'https://image.tmdb.org/t/p/w500/1qos0X6EIi4KT9RmJiVGZB9Kw6l.jpg',
        release_date: '2023-04-27',
        title: 'Os Cavaleiros do Zodíaco - Saint Seiya: O Começo',
        video: false,
        vote_average: 6.5,
        vote_count: 367,
      };

      jest.spyOn(mockUserModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(
        service.addMovieToFavorites(email, movieDto),
      ).rejects.toThrowError(NotFoundException);
    });

    it('should throw ConflictException when movie is already in favorites', async () => {
      const email = 'brumsillva@gmail.com';
      const movieDto: AddFavoriteMovieDto = {
        adult: false,
        backdrop_path: '/oqP1qEZccq5AD9TVTIaO6IGUj7o.jpg',
        genre_ids: [14, 28, 12],
        id: 455476,
        original_language: 'en',
        original_title: 'Knights of the Zodiac',
        overview:
          'Quando um órfão de rua teimoso em busca de sua irmã sequestrada involuntariamente toca em poderes ocultos, ele descobre que pode ser a única pessoa viva que pode proteger uma deusa reencarnada, enviada para vigiar a humanidade. Ele só se tornará um Cavaleiro do Zodíaco quando puder deixar sua irmã ir e abraçar seu destino.',
        popularity: 3963.447,
        poster_path:
          'https://image.tmdb.org/t/p/w500/1qos0X6EIi4KT9RmJiVGZB9Kw6l.jpg',
        release_date: '2023-04-27',
        title: 'Os Cavaleiros do Zodíaco - Saint Seiya: O Começo',
        video: false,
        vote_average: 6.5,
        vote_count: 367,
      };

      const user = new User();
      user.favoriteMovies = [movieDto];

      jest.spyOn(mockUserModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(user),
      });

      await expect(
        service.addMovieToFavorites(email, movieDto),
      ).rejects.toThrowError(ConflictException);
    });
  });

  describe('removeMovieFromFavorites', () => {
    it('should remove a movie from favorites successfully', async () => {
      const email = 'brumsillva@gmail.com';
      const movie: Movie = {
        adult: false,
        backdrop_path: '/oqP1qEZccq5AD9TVTIaO6IGUj7o.jpg',
        genre_ids: [14, 28, 12],
        id: 455476,
        original_language: 'en',
        original_title: 'Knights of the Zodiac',
        overview:
          'Quando um órfão de rua teimoso em busca de sua irmã sequestrada involuntariamente toca em poderes ocultos, ele descobre que pode ser a única pessoa viva que pode proteger uma deusa reencarnada, enviada para vigiar a humanidade. Ele só se tornará um Cavaleiro do Zodíaco quando puder deixar sua irmã ir e abraçar seu destino.',
        popularity: 3963.447,
        poster_path:
          'https://image.tmdb.org/t/p/w500/1qos0X6EIi4KT9RmJiVGZB9Kw6l.jpg',
        release_date: '2023-04-27',
        title: 'Os Cavaleiros do Zodíaco - Saint Seiya: O Começo',
        video: false,
        vote_average: 6.5,
        vote_count: 367,
      };

      const user = new User();
      user.favoriteMovies = [movie];

      jest.spyOn(mockUserModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(user),
      });

      const result = await service.removeMovieFromFavorites(email, movie);

      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email });
      expect(result).toEqual(user);
      expect(user.favoriteMovies).toEqual([]);
    });

    it('should throw NotFoundException when user is not found', async () => {
      const email = 'brumsillva@gmail.com';
      const movie: Movie = {
        adult: false,
        backdrop_path: '/oqP1qEZccq5AD9TVTIaO6IGUj7o.jpg',
        genre_ids: [14, 28, 12],
        id: 455476,
        original_language: 'en',
        original_title: 'Knights of the Zodiac',
        overview:
          'Quando um órfão de rua teimoso em busca de sua irmã sequestrada involuntariamente toca em poderes ocultos, ele descobre que pode ser a única pessoa viva que pode proteger uma deusa reencarnada, enviada para vigiar a humanidade. Ele só se tornará um Cavaleiro do Zodíaco quando puder deixar sua irmã ir e abraçar seu destino.',
        popularity: 3963.447,
        poster_path:
          'https://image.tmdb.org/t/p/w500/1qos0X6EIi4KT9RmJiVGZB9Kw6l.jpg',
        release_date: '2023-04-27',
        title: 'Os Cavaleiros do Zodíaco - Saint Seiya: O Começo',
        video: false,
        vote_average: 6.5,
        vote_count: 367,
      };

      jest.spyOn(mockUserModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(
        service.removeMovieFromFavorites(email, movie),
      ).rejects.toThrowError(NotFoundException);
    });
  });
});
