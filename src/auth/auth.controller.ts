import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
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
  @Get()
  @UseGuards(UserAuthGuard)
  verify() {}
}
