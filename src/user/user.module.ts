/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FavoritesModule } from './favorites/favorites.module';
import { FavoritesService } from './favorites/favorites.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'user',
        schema: UserSchema,
      },
    ]),
    FavoritesModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, FavoritesModule],
})
export class UserModule {}
