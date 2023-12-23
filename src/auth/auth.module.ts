import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTUserStrategy } from './strategies/jwt-user.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({ secret: process.env.JWT_CONSTANT }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTUserStrategy],
})
export class AuthModule {}
