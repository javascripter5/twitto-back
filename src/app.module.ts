import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './modules/posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormOptions } from './database/ormconfig';
import { ScrapeModule } from './modules/scrape/scrape.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ImmotionsModule } from './modules/immotions/immotions.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.gaurd';
import { SessionsModule } from './modules/sessions/sessions.module';
import { AutoLogin } from './utils/middlewares/autoLogin';
import { SettingsModule } from './modules/settings/settings.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormOptions), PostsModule, ScrapeModule, UsersModule, AuthModule, ImmotionsModule, SessionsModule, SettingsModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard, // global middleware of AuthGuard
    },

  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AutoLogin).forRoutes("*")
  }
}
