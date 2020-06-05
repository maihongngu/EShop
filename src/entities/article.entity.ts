import { PrimaryGeneratedColumn, Entity, Column, BeforeInsert, ManyToOne, ManyToMany, JoinColumn, RelationCount } from 'typeorm';
import { AbstractEntity } from './abtract-entity';
import * as slugify from 'slug';
import { UserEntity } from './user.entity';
import { classToPlain } from 'class-transformer';
@Entity('articles')
export class ArticleEntity extends AbstractEntity {
  @Column()
  slug: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  body: string;

  @ManyToMany(type => UserEntity, user => user.favorites, {eager:true})
  @JoinColumn()
  favoritedBy: UserEntity[]

  @RelationCount((article: ArticleEntity) => article.favoritedBy)
  favoritesCount: number

  @ManyToOne(type => UserEntity,user => user.articles, {eager: true})
  author: UserEntity

  @Column('simple-array')
  tagList: string[]


  @BeforeInsert()
  genereateSlug() {
    this.slug =
      slugify(this.title, { lower: true }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString();
  }

  toJSON(){
      return classToPlain(this);
  }

  toArticle(user: UserEntity){
    let favorited = null;
    if (user) {
      favorited = this.favoritedBy.includes(user);
    }
    const article: any = this.toJSON();

    delete article.favoritedBy;

    return { ...article, favorited };
  }

}
