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
import { CorsMiddleware } from './cors.middleware';

import { UsersModule, User } from './api_v2/users';
import { Company, CompanyModule } from './api_v2/companies';
import { AuthModule } from './api_v2/auth/auth.module';
import { Reservation, ReservationModule } from './api_v2/reservations';
import { AppAdminController } from './admin/app.adminController';
import { AppControllerV1 } from './api_v1/app.controller.v1';

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

  controllers: [AppAdminController, AppControllerV1],
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
