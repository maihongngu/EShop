import { IsString, IsNumber } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateProductDTO {
    @IsString()
    @ApiProperty()
    productName: string

    @IsString()
    @ApiProperty()
    productDesc: string

    @IsString()
    @ApiProperty()
    productPrice: string

    @IsNumber()
    @ApiProperty()
    quantity: number
    
}