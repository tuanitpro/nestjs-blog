import { Controller, Post, Res, Body, UnauthorizedException  } from '@nestjs/common';
import { Response } from 'express';
import { LoginModel } from '../models/login.model'
import { AuthenticationService } from '../services/authentication.service'
import { JwtService } from '@nestjs/jwt';

@Controller("api/v1/login")
export class ApiLoginController {
    constructor(private readonly authenticationService: AuthenticationService,
        private jwtService: JwtService) { }
    @Post()
    async post(@Body() loginModel: LoginModel, @Res() response: Response): Promise<any> {
        var result = await this.authenticationService.loginAsync(loginModel);
        if (result) {
            const payload = { username: result.username, sub: result._id.toString() };
            const access_token = this.jwtService.sign(payload)
            console.log(access_token)
            return response.status(200).json({ access_token })
        }
        else {
            return response.status(400).json({ data: "Username or email in correct" })
        }
    }
}
