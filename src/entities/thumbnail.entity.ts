import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { Video } from './video.entity';

@Entity('thumbnails')
export class Thumbnail extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  image: string;

  @Column({
    type: 'int',
  })
  orderIndex: number;

  @ManyToOne(() => Video, (video) => video.thumbnails)
  video: Video;
}
