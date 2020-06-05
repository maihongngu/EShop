import { IsString, IsArray } from 'class-validator'


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