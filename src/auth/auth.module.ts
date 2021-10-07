import { Module } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service'
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';

@Module({
    imports: [PassportModule, JwtModule.register({
        secret: "secretKey",
        signOptions: { expiresIn: '60s' },
    }),],
    providers: [AuthenticationService, LocalStrategy],
    exports:[
        AuthenticationService
    ]
})
export class AuthModule { }