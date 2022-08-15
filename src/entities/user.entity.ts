import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  _id: Number;

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
  job: Number;

  @Column()
  major: Number;

  @Column()
  gender: Number;

  @Column()
  birthDay: Date;
}
