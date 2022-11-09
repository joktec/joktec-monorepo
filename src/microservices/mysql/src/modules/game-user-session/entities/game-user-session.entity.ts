import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('game_user_session')
export class GameUserSession {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Column('varchar', { name: 'user_id', length: 255 })
  userId: string;

  @Column('varchar', { name: 'device_id', length: 255 })
  deviceId: string;
}
