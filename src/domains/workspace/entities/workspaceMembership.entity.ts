import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Membership } from '../../membership';
import { Workspace } from './workspace.entity';

// ws ms
@Entity('workspaceMembership')
export class WorkspaceMembership {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startedAt: Date;

  @Column()
  expiredAt: Date;

  @Column()
  registeredAt: Date;

  @Column()
  unregisteredAt: Date;

  @Column()
  isActive: boolean;

  @ManyToOne(() => Membership, (m) => m.workspaces)
  membership: Membership;

  @OneToOne(() => Workspace, (ws) => ws.membership)
  @JoinTable()
  workspace: Workspace;
}
