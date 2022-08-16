import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Calender {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  userId: string;

  @Column()
  month: number;

  @Column()
  like: number;
}
