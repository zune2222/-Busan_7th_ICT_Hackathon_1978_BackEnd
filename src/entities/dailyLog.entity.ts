import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DailyLog {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  userId: number;

  @Column()
  calendarId: number;

  @Column()
  date: Date;

  @Column()
  progress: number;
}
