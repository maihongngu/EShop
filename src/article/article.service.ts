import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/entities/article.entity';
import { Repository, Like } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { CreateArticleDTO, UpdateArticleDTO, findAllQuery, ArticleResponse } from 'src/models/article.models';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleRepo: Repository<ArticleEntity>,

    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  findBySlug(slug: string) {
    return this.articleRepo.findOne({ where: { slug } });
  }

  async findAll(
    user: UserEntity,
    query: findAllQuery,
  ): Promise<ArticleResponse[]> {
    let findOptions: any = {
      where: {},
    };
    if (query.author) {
      findOptions.where['author.username'] = query.author;
    }
    if (query.favorited) {
      findOptions.where['favoritedBy.username'] = query.favorited;
    }
    if (query.tag) {
      findOptions.where.tagList = Like(`%${query.tag}%`);
    }
    if (query.offset) {
      findOptions.offset = query.offset;
    }
    if (query.limit) {
      findOptions.limit = query.limit;
    }
    return (await this.articleRepo.find(findOptions)).map(article =>
      article.toArticle(user),
    );
  }


  async findFeed(user: UserEntity, query: findAllQuery): Promise<ArticleResponse[]>{

    const {following} = await this.userRepo.findOne({where: {id: user.id},relations:['following']})
    const findOption = {...query, where: following.map(follow => ({author: follow.id})), }



    return (await this.articleRepo.find(findOption)).map(article => article.toArticle(user))
  }

  async createArticle(user: UserEntity, data: CreateArticleDTO) : Promise<ArticleResponse> {
    const article = this.articleRepo.create(data);

    article.author = user;

    const {slug} = await article.save();

    return (await (await this.articleRepo.findOne({slug})).toArticle(user));
  }

  async updateArticle(slug:string,user: UserEntity, data: UpdateArticleDTO) : Promise<ArticleResponse>{

    const article = await this.findBySlug(slug)
    if(!this.ensureOwnerShip(user,article)){
        throw new UnauthorizedException()
    }
    await this.articleRepo.update({slug}, data)
    return article.toArticle(user);

  }

  async deleteArticle(slug: string, user: UserEntity): Promise<ArticleResponse> {

    const article = await this.findBySlug(slug)

    if(!this.ensureOwnerShip(user, article)){
        throw new UnauthorizedException()
    }

    await this.articleRepo.remove(article)
    return article.toArticle(user);
  }

  //Middleware
  private ensureOwnerShip(user: UserEntity, article: ArticleEntity) : boolean {
    return article.author.id === user.id;
  }

  async favoriteArticle(
    slug: string,
    user: UserEntity,
  ): Promise<ArticleResponse> {
    const article = await this.findBySlug(slug);
    article.favoritedBy.push(user);
    await article.save();
    console.log(article);
    return (await this.findBySlug(slug)).toArticle(user);
  }

  async unfavoriteArticle(
    slug: string,
    user: UserEntity,
  ): Promise<ArticleResponse> {
    const article = await this.findBySlug(slug);
    article.favoritedBy = article.favoritedBy.filter(fav => fav.id !== user.id);
    await article.save();
    return (await this.findBySlug(slug)).toArticle(user);
  }


}
