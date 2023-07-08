import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}
  async create(CreateUserDto) {
    const user = {
      ...CreateUserDto,
      password: await bcrypt.hash(CreateUserDto.password, 10),
    };
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  findAll() {
    return `This action returns all user`;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();
    if (user) {
      return user;
    } else {
      throw new NotFoundException(`User ${email} not found`);
    }
  }
}
