import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { WorkoutLevel } from './enums/workoutLevel.enum';
import { DurationType } from './enums/durationType.enum';
import { Channel } from './channel.entity';
import { Thumbnail } from './thumbnail.entity';
import { Donation } from './donation.entity';
import { WatchingVideoHistory } from './watching-video-history.entity';
import { Comment } from './comment.entity';

@Entity('videos')
export class Video extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  title: string;

  @Column({
    type: 'varchar',
  })
  oldPassword: string;

  @Column({
    type: 'enum',
    enum: WorkoutLevel,
  })
  workoutLevel: WorkoutLevel;

  @Column({
    type: 'enum',
    enum: DurationType,
  })
  duration: DurationType;

  @Column({
    type: 'varchar',
  })
  keywords: string;

  @Column({
    type: 'boolean',
  })
  isCommentable: boolean;

  @ManyToOne(() => Channel, (channel) => channel.videos)
  channel: Channel;

  @OneToMany(() => Thumbnail, (thumbnail) => thumbnail.video)
  thumbnails: Thumbnail[];

  @OneToMany(() => Comment, (comment) => comment.video)
  comments: Comment[];

  @OneToMany(() => Donation, (donation) => donation.video)
  donations: Donation[];

  @OneToMany(() => WatchingVideoHistory, (watchingVideoHistory) => watchingVideoHistory.video)
  watchingVideoHistorys: WatchingVideoHistory[];
}
