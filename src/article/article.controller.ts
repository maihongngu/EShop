import { Controller, Get, Param, Post, UseGuards, Body, ValidationPipe, Put, Delete, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { User } from 'src/auth/user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { CreateArticleDTO, UpdateArticleDTO, findAllQuery, findFeedQuery } from 'src/models/article.models';
import { AuthGuard } from '@nestjs/passport';
import { OptionalAuthGuard } from 'src/auth/optional-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Article')
@Controller('article')
export class ArticleController {

    constructor(private articleService: ArticleService){}


    @Get('/:slug')
    @UseGuards(new OptionalAuthGuard)

    async findBySlug(@Param('slug') slug: string, @User() user: UserEntity){
        const article = await this.articleService.findBySlug(slug)

        return {article: article.toArticle(user)}
    }

    @Get()
    @UseGuards(new OptionalAuthGuard)
    async findAll(@User() user:UserEntity, @Query() query: findAllQuery ){
        const articles = await this.articleService.findAll(user, query)

        return {articles, articlesCount: articles.length}
    }

    @Get('/feed')
    async findFeed(@User() user:UserEntity, @Query() query: findFeedQuery ){
        const articles = await this.articleService.findFeed(user, query)

        return {articles, articlesCount: articles.length}
    }

    @Post()
    @UseGuards(AuthGuard())
    async createArticle(@User() user: UserEntity, @Body(ValidationPipe) data:{article: CreateArticleDTO}){

        const article = await this.articleService.createArticle(user, data.article)

        return {article}

    }

    @Put('/:slug')
    @UseGuards(AuthGuard())
    async updateArticle(@User() user:UserEntity, @Body(ValidationPipe) data: {article: UpdateArticleDTO}, @Param('slug') slug : string){

        const article = await this.articleService.updateArticle(slug,user, data.article)

        return {article}

    }

    @Delete('/:slug')
    @UseGuards(AuthGuard())
    async deleteArticle(@Param('slug') slug: string, @User() user: UserEntity ){
        const article = await this.articleService.deleteArticle(slug, user)

        return {article}
    }
    

}
