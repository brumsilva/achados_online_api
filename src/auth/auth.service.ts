import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const isPasswordIsValid = await bcrypt.compare(password, user.password);

      if (isPasswordIsValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new Error('E-mail address or password is incorrect.');
    return user;
  }
}
