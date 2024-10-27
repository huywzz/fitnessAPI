import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { UUID } from 'crypto';
import { v4 as uuidV4 } from 'uuid';

@Entity('refresh-tokens')
export class RefreshToken {
  @PrimaryColumn('uuid', {
    name: 'id',
  })
  @Index()
  id: UUID;

  @Column({
    type: 'varchar',
  })
  refreshToken: string;

  @Column({
    type: 'varchar',
  })
  ipAddress: string;

  @Column({
    type: 'varchar',
  })
  userAgent: string;

  @ManyToOne(() => User, (user) => user.refreshTokens)
  user: User;

  @UpdateDateColumn()
  public updatedAt: Date;

  @CreateDateColumn()
  public createdAt: Date;

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
