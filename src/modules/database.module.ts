import {Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import { databaseProviders } from './database.providers';
import { PostSchema } from '../schemas/post.schema';
import { TagSchema } from '../schemas/tag.schema';
import { CategorySchema } from '../schemas/category.schema';
import { UserSchema } from '../schemas/user.schema';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/blogs'),
        MongooseModule.forFeature([
            { name: 'Posts', schema: PostSchema },
            { name: 'Tags', schema: TagSchema },
            { name: 'Categories', schema: CategorySchema },
            { name: 'Users', schema: UserSchema },
          ]),
    ],
    providers: [...databaseProviders],
    exports: [...databaseProviders]
})

export class DatabaseModule {}