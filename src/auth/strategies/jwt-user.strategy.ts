import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
@Injectable()
export class JWTUserStrategy extends PassportStrategy(
  Strategy,
  'jwtUserStrategy',
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_CONSTANT,
    });
  }
  //NOTE: called after guard canActivate fn -> if token is invalid -> this fn will not execute
  async validate(payload: any) {
    const user = await this.authService.findOne(payload._id);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
