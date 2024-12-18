import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { FollowEntity } from './follow.entity';
import { IntroductionEntity } from './introduction.entity';
import { NotificationEntity } from './notification.entity';
import { PostEntity } from './post.entity';

/** ユーザ情報 */
@Entity('users')
export class UserEntity {
  @PrimaryColumn({ name: 'id', unique: true })
  public id: string;
  
  @Column({ name: 'password_hash' })
  public passwordHash: string;
  
  @Column({ name: 'name', default: '名無し' })
  public name: string;
  
  @Column({ name: 'role', default: 'Normal' })
  public role: string;
  
  @Column({ name: 'avatar_url', nullable: true })
  public avatarUrl: string;
  
  @Column({ name: 'profile_text', nullable: true })
  public profileText: string;
  
  /** 自分自身の投稿のふぁぼ数を見えるようにするか否か */
  @Column({ name: 'show_own_favourites_count', default: true })
  public showOwnFavouritesCount: boolean;
  
  /** 他人の投稿のふぁぼ数を見えるようにするか否か */
  @Column({ name: 'show_others_favourites_count', default: true })
  public showOthersFavouritesCount: boolean;
  
  @CreateDateColumn({ name: 'created_at' })
  public readonly createdAt: Date;
  
  @UpdateDateColumn({ name: 'updated_at' })
  public readonly updatedAt: Date;
  
  /** 投稿情報 (子) との親子関係を示す (カラムは作られない) : `@ManyToOne` を指定したプロパティと相互紐付けする */
  @OneToMany(() => PostEntity, postEntity => postEntity.user, { createForeignKeyConstraints: false })
  public posts: Array<PostEntity>;
  
  /** 自身のことをフォローしているフォロワーたち */
  @OneToMany(() => FollowEntity, followEntity => followEntity.follower, { createForeignKeyConstraints: false })
  public followers: Array<FollowEntity>;
  
  /** 自身がフォローしている人たち */
  @OneToMany(() => FollowEntity, followEntity => followEntity.following, { createForeignKeyConstraints: false })
  public followings: Array<FollowEntity>;
  
  /** ユーザが受信する通知 */
  @OneToMany(() => NotificationEntity, notificationEntity => notificationEntity.recipientUser, { createForeignKeyConstraints: false })
  public recipientNotifications: Array<NotificationEntity>;
  
  /** ユーザが送信した通知 */
  @OneToMany(() => NotificationEntity, notificationEntity => notificationEntity.actorUser, { createForeignKeyConstraints: false })
  public actorNotifications: Array<NotificationEntity>;
  
  /** ユーザが相互フォロワーから受け取った紹介 */
  @OneToMany(() => IntroductionEntity, introductionEntity => introductionEntity.recipientUser, { createForeignKeyConstraints: false })
  public recipientIntroductions: Array<IntroductionEntity>;
  
  /** ユーザが相互フォロワーに送った紹介 */
  @OneToMany(() => IntroductionEntity, introductionEntity => introductionEntity.actorUser, { createForeignKeyConstraints: false })
  public actorIntroductions: Array<IntroductionEntity>;
  
  constructor(partial: Partial<UserEntity>) { Object.assign(this, partial); }
}
