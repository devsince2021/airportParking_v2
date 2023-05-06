import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  validateConfig,
  AppConfig,
  MainDbConfig,
  AuthDbConfig,
  SwaggerConfig,
  NaverConfig,
} from './configs';

import { UsersModule, User } from './domains/users';
import { Company, CompanyModule } from './domains/companies';
import { AuthModule } from './domains/auth/auth.module';
import { Reservation, ReservationModule } from './domains/reservations';
import { CorsMiddleware } from './cors.middleware';
import { AppViewController } from './app.viewController';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./.env.${process.env.NODE_ENV}`,
      validate: validateConfig([
        AppConfig,
        MainDbConfig,
        AuthDbConfig,
        SwaggerConfig,
        NaverConfig,
      ]),
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [User, Company, Reservation],
          synchronize: configService.get('DB_SYNC'),
        };
      },
    }),

    UsersModule,
    AuthModule,
    ReservationModule,
    CompanyModule,
  ],

  controllers: [AppViewController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware)
      .forRoutes(
        { path: '/api/user', method: RequestMethod.POST },
        { path: '/api/reservation', method: RequestMethod.POST },
      );
  }
}
