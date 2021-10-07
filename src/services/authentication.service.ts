import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { LoginModel } from 'src/models/login.model';
import { UserModel } from 'src/models/user.model';

@Injectable()
export class AuthenticationService {
    constructor(@InjectModel("Users") private userCollection: Model<UserDocument>) { }
    onModuleInit() {
        console.log(`The module AuthenticationService has been initialized.`);
    }

    async loginAsync(loginModel: LoginModel): Promise<any> {
        const user = await this.userCollection.findOne({ username: loginModel.username }).exec();
        if (user) {
            const password = loginModel.password;
            const hash = user.password
            const isMatch = await bcrypt.compare(password, hash);
            return isMatch ? user : false;
        } else {
            return false
        }
    }

    async registerAsync(userModel: UserModel): Promise<any> {
        const user = await this.userCollection.findOne({ username: userModel.username, email: userModel.email }).exec();
        console.log(user)
        if (user) {
            return false
        }
        else {
            const password = await this.generateHashPasswordAsync(userModel.password);
            userModel.password = password
            const createdPost = new this.userCollection(userModel);
            await createdPost.save()
            return true
        }
    }

    async generateHashPasswordAsync(password: string): Promise<any> {
        const saltOrRounds = 10
        const hash = await bcrypt.hash(password, saltOrRounds)
        return hash
    }
}
