import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Developer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  cleAPI?: string;

  @Column({ unique: true })
  entreprise: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column()
  status?: string;

  @Column()
  notes: string;
}
