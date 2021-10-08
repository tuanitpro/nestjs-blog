import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TerminusModule } from '@nestjs/terminus';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@nestjs/axios'
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from './modules/database.module';
import { LoggerMiddleware } from './middlewares/logger.middleware'
import configuration from './config/configuration';
import { AppController } from './app.controller';
import { PostController } from './pages/post.controller';
import { ApiPostController } from './api/api.post.controller';
import { ApiTagController } from './api/api.tag.controller';
import { ApiCategoryController } from './api/api.category.controller';
import { ApiLoginController } from './api/api.login.controller';
import { ApiRegisterController } from './api/api.register.controller';
import { AppService } from './app.service';
import { PostService } from './services/post.service';
import { TagService } from './services/tag.service';
import { CategoryService } from './services/category.service';
import { AuthenticationService } from './services/authentication.service';
import { PostSchema } from './schemas/post.schema';
import { TagSchema } from './schemas/tag.schema';
import { CategorySchema } from './schemas/category.schema';
import { UserSchema } from './schemas/user.schema';
import { HealthController } from './pages/health/health.controller';
import { UploaderController } from './pages/uploader/uploader.controller';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      load: [configuration],
    }),
    DatabaseModule,

    MongooseModule.forFeature([
      { name: 'Posts', schema: PostSchema },
      { name: 'Tags', schema: TagSchema },
      { name: 'Categories', schema: CategorySchema },
      { name: 'Users', schema: UserSchema },
    ]),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    PassportModule,
    JwtModule.register({
      secret: "secretKey",
      signOptions: { expiresIn: '60s' },
    }),
    // AuthModule,
    TerminusModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    })
  ],
  controllers: [
    AppController,
    PostController,
    ApiPostController,
    ApiTagController,
    ApiCategoryController,
    ApiLoginController,
    ApiRegisterController,
    HealthController,
    UploaderController
  ],
  providers: [ConfigService, AppService, PostService, TagService, CategoryService, AuthenticationService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*")
  }
}
