import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { crypto } from '../common/helpers/crypto';
import { User } from '../users/entities/user.entity';
import { UsersMap } from '../users/users.map';
import { UsersService } from '../users/users.service';
import { LoginUserResponse } from './dto/login-user.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async login(user: User): Promise<LoginUserResponse> {
    return {
      access_token: this.jwtService.sign({
        email: user.email,
        sub: user.id
      }),
      user
    };
  }

  async validateUser(
    email: string,
    password: string
  ): Promise<User | undefined> {
    const user = await this.usersService.findOne(email);
    if (user) {
      const valid = await crypto.compare(password, user.password);
      if (valid) {
        delete user.password;
        return UsersMap.map(user);
      }
    }

    return undefined;
  }
}
