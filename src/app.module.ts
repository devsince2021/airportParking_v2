import { Module } from '@nestjs/common';

import { RootConfig } from './configs';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/controllers/users.controller';

@Module({
  imports: [RootConfig, UsersModule],
  controllers: [UsersController],
})
export class AppModule {}
