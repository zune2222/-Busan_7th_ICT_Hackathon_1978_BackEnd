import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DailyLog {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  userId: string;

  @Column()
  calendarId: string;

  @Column()
  date: Date;

  @Column()
  progress: Number;
}
