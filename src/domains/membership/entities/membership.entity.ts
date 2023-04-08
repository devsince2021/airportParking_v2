import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WorkspaceMembership } from '../../workspace';

export enum MembershipType {
  free = 'F',
  trial = 'T',
  regular = 'R',
  custom = 'C', // special offer kinds of
}

@Entity('membership')
export class Membership {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: MembershipType })
  type: MembershipType;

  @Column()
  price: number;

  @OneToMany(() => WorkspaceMembership, (wm) => wm.membership)
  workspaces: WorkspaceMembership[];
}
