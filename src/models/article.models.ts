import { IsString, IsArray } from 'class-validator'
import {ProfileResponse} from './user.model'

export class CreateArticleDTO {
        
    @IsString()
    title: string

    @IsString()
    body: string

    @IsString()
    description: string

    @IsArray()
    @IsString({each:true})
    tagList: string[]

}


export class UpdateArticleDTO {

    @IsString()
    title: string

    @IsString()
    body: string

    @IsString()
    description: string

    @IsArray()
    @IsString({each:true})
    tagList: string[]

}

export interface findFeedQuery {
    limit?: number
    offset?: number
}
export interface findAllQuery extends findFeedQuery {
    
    tag?: string
    author?: string
    favorited?: string

}

export interface ArticleResponse {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: Date | string;
    updatedAt: Date | string;
    favorited: boolean | null;
    favoritesCount: number;
    author: ProfileResponse;
  }
