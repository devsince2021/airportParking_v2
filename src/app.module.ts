import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  validateConfig,
  AppConfig,
  MainDbConfig,
  AuthDbConfig,
  SwaggerConfig,
} from './configs';
import { UsersModule, User } from './domains/users';
import { Company } from './domains/companies';
import { AuthModule } from './domains/auth/auth.module';
import { NaverConfig } from './configs/defines/naverConfig';
import { Workspace, WorkspaceMembership } from './domains/workspace';

import { Membership } from './domains/membership';

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
          entities: [User, Workspace, Company, WorkspaceMembership, Membership], //Company, Workspace, WorkspaceMembership, Membership
          synchronize: configService.get('DB_SYNC'),
          autoLoadEntities: true,
        };
      },
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get('AUTH_DB_URI'),
        };
      },
    }),
    UsersModule,
    AuthModule,
  ],

  controllers: [],
})
export class AppModule {}

// User, Workspace, Company, WorkspaceMembership, Membership
