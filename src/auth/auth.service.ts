import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  async signUp(dto: CreateUserDto) {
    const user = await this.userService.create(dto);
    return { token: this.jwtService.sign({ _id: user._id }) };
  }
}
