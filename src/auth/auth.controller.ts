import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDocument } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { User } from './decorators/user.decorator';
import { CreateUserDto } from './dto/user.dto';
import { UserAuthGuard } from './guards/user-auth.guard';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  signUp(@Body() dto: CreateUserDto) {
    return this.authService.signUp(dto);
  }

  @Get('verify')
  @UseGuards(UserAuthGuard)
  verify(@User() user: UserDocument, @Query('otp') otp: string) {
    return this.authService.verifyOtp(user, otp);
  }
}
