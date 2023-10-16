import { IsArray, IsDecimal, IsNotEmpty, IsNumber, IsUrl } from "class-validator";

export class CreateCakeDto{
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    family: string;

    @IsNotEmpty()
    flavor: string;

    @IsArray()
    ingredients: string[];

    filling: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    stock: number;

    @IsNotEmpty()
    @IsUrl()
    image: string;
}