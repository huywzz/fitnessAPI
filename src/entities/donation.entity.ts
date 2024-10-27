import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { User } from './user.entity';
import { Video } from './video.entity';

@Entity('donations')
export class Donation extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  numberOfREPs: string;

  @Column({
    type: 'varchar',
  })
  content: string;

  @ManyToOne(() => User, (user) => user.donations)
  user: User;

  @ManyToOne(() => Video, (video) => video.donations)
  video: Video;
}
