import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuration';
import { AppController } from './app.controller';
import { PostController } from './pages/post.controller';
import { ApiPostController } from './api/api.post.controller';
import { ApiTagController } from './api/api.tag.controller';
import { ApiCategoryController } from './api/api.category.controller';
import { AppService } from './app.service';
import { PostService } from './services/post.service';
import { TagService } from './services/tag.service';
import { CategoryService } from './services/category.service';
import { PostSchema } from './schemas/post.schema';
import { TagSchema } from './schemas/tag.schema';
import { CategorySchema } from './schemas/category.schema';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      load: [configuration],
    }),
    MongooseModule.forRoot('mongodb://localhost/blogs'),
    MongooseModule.forFeature([
      { name: 'Posts', schema: PostSchema },
      { name: 'Tags', schema: TagSchema },
      { name: 'Categories', schema: CategorySchema },
    ]),
  ],
  controllers: [
    AppController,
    PostController,
    ApiPostController,
    ApiTagController,
    ApiCategoryController,
  ],
  providers: [AppService, PostService, TagService, CategoryService],
})
export class AppModule {}
