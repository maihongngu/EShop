import { AbstractEntity } from "./abtract-entity";
import { Entity, Column } from "typeorm";
import { IsString } from "class-validator";


@Entity('categories')
export abstract class CategoryEntity extends AbstractEntity {

    @Column()
    @IsString()
    category_name: string
   
}