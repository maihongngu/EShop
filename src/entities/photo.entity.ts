import { AbstractEntity } from "./abtract-entity";
import { Entity, Column, ManyToOne } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity('photos')
export abstract class PhotoEntity extends AbstractEntity {
    
    @Column()
    url: string

    @ManyToOne(type => ProductEntity, photo => photo.imgPaths, {onDelete:'CASCADE'})
    productId: ProductEntity


}