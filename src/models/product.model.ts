import { IsString, IsNumber } from "class-validator"

export class CreateProductDTO {
    @IsString()
    productName: string

    @IsString()
    productDesc: string

    @IsString()
    productPrice: string

    @IsNumber()
    quantity: number
    
}