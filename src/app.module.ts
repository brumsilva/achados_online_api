import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { LikedFilmsModule } from './liked-films/liked-films.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://brumsilva:Brun1997.@clusterdemo.39gxlfq.mongodb.net/',
    ),
    UsersModule,
    LikedFilmsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
