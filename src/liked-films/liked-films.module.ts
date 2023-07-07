import { Module } from '@nestjs/common';
import { LikedFilmsController } from './liked-films.controller';
import { SharedService } from './shared/shared.service';

@Module({
  controllers: [LikedFilmsController],
  providers: [SharedService]
})
export class LikedFilmsModule {}
