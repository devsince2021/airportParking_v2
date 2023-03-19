import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum SignInTypes {
  Eamil = 'EM',
  Kakao = 'KA',
}

enum UserRole {
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
  signInType: string;

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
