import { Column, Entity, ManyToOne, Tree, TreeChildren, TreeParent } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { User } from './user.entity';
import { Video } from './video.entity';

@Entity('comments')
@Tree('closure-table')
export class Comment extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  content: string;

  @Column({
    type: 'int',
    default: 0,
  })
  numberOfLike: number;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Video, (video) => video.comments)
  video: Video;

  @TreeChildren()
  children: Comment[];

  @TreeParent()
  parent: Comment;
}
