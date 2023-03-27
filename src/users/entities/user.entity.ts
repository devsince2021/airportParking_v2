import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsInt, IsEmail, IsNotEmpty } from 'class-validator';

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

  //@ManyToOne()
  //Company: Company
}
