import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service'
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthenticationService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
      const loginModel = {
        username: username,
        password: password
      }
    const user = await this.authService.loginAsync(loginModel);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}