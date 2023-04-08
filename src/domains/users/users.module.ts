import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Workspace } from '../workspace';
import { WorkspaceMembership } from '../workspace/entities/workspaceMembership.entity';
import { Membership } from '../membership';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';
import { Company } from '../companies';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
