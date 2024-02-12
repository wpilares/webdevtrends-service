import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class News {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  author: string;

  @Column('text')
  storyTitle: string;

  @Column('integer', { unique: true })
  storyId: number;

  @Column('text')
  storyURL: string;

  @Column('date')
  createdAt: Date;
}
