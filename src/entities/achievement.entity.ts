import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Achievement {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  dailyLogId: string;

  @Column()
  name: string;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  progess: Number;
}
