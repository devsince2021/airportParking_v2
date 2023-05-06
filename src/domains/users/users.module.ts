import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users.controller';
import { UsersViewController } from './controllers/users.viewController';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';
import { UsersRepository } from './repository/users.repository';

@Module({
  imports: [forwardRef(() => TypeOrmModule.forFeature([User]))],
  controllers: [UsersController, UsersViewController],
  providers: [UsersService, UsersRepository],
  exports: [UsersRepository],
})
export class UsersModule {}
