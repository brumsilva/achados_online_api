/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}

  async create(createUserDto) {
    const { email } = createUserDto;

    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new ConflictException('O usuario já existe. Tente criar utilizando um novo e-mail.');
    }

    const user = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = new this.userModel(user);
    return await createdUser.save();
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
