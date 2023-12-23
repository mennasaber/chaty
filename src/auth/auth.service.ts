import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/user/entities/user.entity';
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
    const token = await this.jwtService.signAsync({ _id: user._id });
    return { token };
  }

  findOne(id: string) {
    return this.userService.findById(id);
  }

  async verifyOtp(user: UserDocument, otp: string) {
    await this.userService.verify(user._id, otp);
    return {
      message: 'User verified successfully!',
    };
  }
}
