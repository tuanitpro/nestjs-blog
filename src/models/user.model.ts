import { IsEmail, IsNotEmpty } from 'class-validator';
export class UserModel {
    id: string
    @IsNotEmpty()
    name: string
    @IsNotEmpty()
    username: string
    @IsNotEmpty()
    password: string
    @IsNotEmpty()
    @IsEmail()
    email: string
    phone: string    
}