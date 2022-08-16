import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  _id: number;

  @PrimaryColumn({ unique: true })
  id: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column()
  salt: string;

  @Column()
  room: string;

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
