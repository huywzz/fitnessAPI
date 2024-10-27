import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { User } from './user.entity';
import { Channel } from './channel.entity';

@Entity('follows')
export class Follow extends BaseEntity {
  @ManyToOne(() => User, (user) => user.follows)
  user: User;

  @ManyToOne(() => Channel, (channel) => channel.follows)
  channel: Channel;
}
