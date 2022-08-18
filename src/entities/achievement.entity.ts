import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Achievement {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  userId: number;

  @Column()
  dailyLogId: number;

  @Column()
  title: string;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  progress: number;

  @Column()
  position: number;
}
