import { Controller, Post, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { UserModel } from '../models/user.model'
import { AuthenticationService } from '../services/authentication.service'

@Controller("api/v1/register")
export class ApiRegisterController {
    constructor(private readonly authenticationService: AuthenticationService) { }

    @Post()
    async post(@Body() userModel: UserModel, @Res() response: Response): Promise<any> {
        var user = await this.authenticationService.registerAsync(userModel);
        if (user) {
            return response.status(201).json({ user })
        } else {
            return response.status(400).json({ data: "User existsed" })
        }
    }
}
