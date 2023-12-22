import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import { Model } from 'mongoose';
import { Utilities } from 'src/utilities';
import { CreateUserDto } from './dto/user.dto';
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
      return {
        statusCode: 400,
        errorCode: 1,
        message: 'User is already exists!',
      };
    }
    if (existUser && !existUser.isVerified) {
      existUser.removed = true;
      await existUser.save();
    }
    const otp = Utilities.generateOtp();
    await this.userModel.create({
      ...dto,
      otp: otp,
      otpExpiresAt: dayjs().add(5, 'minute'),
    });
    return {
      statusCode: 200,
      message: 'User created successfully',
    };
  }
}