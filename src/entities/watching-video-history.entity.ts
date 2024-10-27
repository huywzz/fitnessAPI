import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { User } from './user.entity';
import { Video } from './video.entity';

@Entity('watching-video-histories')
export class WatchingVideoHistory extends BaseEntity {
  @Column({
    type: 'int',
  })
  times: number;

  @Column({
    type: 'int',
  })
  rate: number;

  @ManyToOne(() => User, (user) => user.watchingVideoHistorys)
  user: User;

  @ManyToOne(() => Video, (video) => video.watchingVideoHistorys)
  video: Video;
}
