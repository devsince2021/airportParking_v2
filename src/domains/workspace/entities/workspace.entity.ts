import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users';
import { Company } from '../../companies';
import { WorkspaceMembership } from './workspaceMembership.entity';

@Entity('workspace')
export class Workspace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  spaceName: string;

  @Column()
  spaceHost: number;

  @Column({ type: 'simple-array' })
  spaceMangers: number[];

  @ManyToMany(() => User, (user) => user.workspaces)
  @JoinTable()
  users: User[];

  @OneToMany(() => Company, (c) => c.workspace)
  companies: Company[];

  @OneToOne(() => WorkspaceMembership, (wm) => wm.workspace)
  membership: WorkspaceMembership;
}
