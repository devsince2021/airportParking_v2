import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

export enum SignInTypes {
  Email = 'EM',
  Kakao = 'KA',
}

export enum UserRole {
  Founder = 'F',
  CoFounder = 'C',
  GeneralManager = 'G',
  Manager = 'M',
  Staff = 'S',
}

@Entity('user')
@Unique(['phone'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: SignInTypes,
  })
  signInType: SignInTypes;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @Column()
  email: string;

  @Column()
  password: string;

  //@ManyToOne()
  //Company: Company
}
