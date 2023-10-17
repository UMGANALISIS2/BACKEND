import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class SentenceDto{
    @IsString()
    @IsNotEmpty()
    field: string;

    @IsString()
    @IsNotEmpty()
    operator: string;

    @IsArray()
    value: string[];
}