import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import { Model } from 'mongoose';
import { Utilities } from 'src/utilities';
import { CreateUserDto } from '../auth/dto/user.dto';
import { User, UserDocument } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(dto: CreateUserDto) {
    const existUser = await this.userModel.findOne({
      phoneNumber: dto.phoneNumber,
      removed: false,
    });
    if (existUser && existUser.isVerified) {
      throw new BadRequestException('User is already exists!');
    }
    if (existUser && !existUser.isVerified) {
      existUser.removed = true;
      await existUser.save();
    }
    const otp = Utilities.generateOtp();
    return await this.userModel.create({
      ...dto,
      otp: otp,
      otpExpiresAt: dayjs().add(5, 'minute'),
    });
  }

  findById(id: string) {
    return this.userModel.findOne({ _id: id, removed: false });
  }

  async verify(id: string, otp: string) {
    const user = await this.userModel.findById(id);
    if (user.isVerified) {
      throw new BadRequestException('User is verified already!');
    }
    if (user.otpExpiresAt < new Date()) {
      throw new BadRequestException('OTP is expired!');
    }
    if (otp !== user.otp) {
      throw new BadRequestException('OTP is invalid!');
    }
    user.isVerified = true;
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();
  }
}
