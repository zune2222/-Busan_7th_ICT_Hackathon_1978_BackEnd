import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserLog {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  userId: string;

  @Column()
  dailyLogId: string;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  position: Number;
}
