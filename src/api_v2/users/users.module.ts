import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

@Module({
  imports: [forwardRef(() => TypeOrmModule.forFeature([User]))],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersRepository, UsersService],
})
export class UsersModule {}
