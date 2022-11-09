import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('quiz_category')
export class QuizCategory {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Column('varchar', { name: 'created_by', nullable: true, length: 255 })
  createdBy: string | null;

  @Column('varchar', { name: 'updated_by', nullable: true, length: 255 })
  updatedBy: string | null;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('varchar', { name: 'name_vi', nullable: true, length: 255 })
  nameVi: string | null;

  @Column('tinyint', { name: 'is_active', width: 1 })
  isActive: boolean;
}
