import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { FavouriteEntity } from './favourite.entity';
import { UserEntity } from './user.entity';

/** 投稿 */
@Entity('posts')
export class PostEntity {
  @PrimaryColumn({ name: 'id', type: 'bigint', unique: true })
  public id: string;  // bigint に対応する型として string を使用する
  
  @Column({ name: 'user_id' })
  public userId: string;
  
  @Column({ name: 'text' })
  public text: string;
  
  /** この投稿がふぁぼられた数 (キャッシュ用) */
  @Column({ name: 'favourites_count', default: 0 })
  public favouritesCount: number;
  
  @CreateDateColumn({ name: 'created_at' })
  public readonly createdAt: Date;
  
  @UpdateDateColumn({ name: 'updated_at' })
  public readonly updatedAt: Date;
  
  /** ユーザ (親) との親子関係を示す (カラムは作られない) */
  @ManyToOne(() => UserEntity, userEntity => userEntity.posts, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })  // 本 `posts.user_id` が `users.id` (親) の Foreign Key であることを示す
  public user: UserEntity;
  
  /** この投稿がふぁぼられた情報との関係を示す */
  @OneToMany(() => FavouriteEntity, favouriteEntity => favouriteEntity.post, { createForeignKeyConstraints: false })
  public favourites: Array<FavouriteEntity>;
  
  constructor(partial: Partial<PostEntity>) { Object.assign(this, partial); }
  
  /** Insert 前に行われる処理 */
  @BeforeInsert()
  public generateId() {
    this.id = Date.now().toString();  // UNIX エポック秒 (ミリ秒)
  }
}
