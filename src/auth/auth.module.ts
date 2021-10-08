import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants'
@Module({
    imports: [
        PassportModule, 
        JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: jwtConstants.expiresIn },
    }),],
    providers: [],
    exports: [

    ]
})
export class AuthModule { }