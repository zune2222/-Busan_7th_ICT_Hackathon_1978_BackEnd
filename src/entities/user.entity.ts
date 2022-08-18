import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  loginId: string;

  @Column()
  userId: number;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column()
  room: string | null;

  @Column()
  visible: boolean;

  @Column()
  job: number;

  @Column()
  major: number;

  @Column()
  gender: number;

  @Column()
  birthDay: Date;
}
