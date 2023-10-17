import { IsArray, IsNotEmpty } from "class-validator";
import { SentenceDto } from "./SentenceDto";

export class CakeQueryDto{
    @IsArray()
    @IsNotEmpty()
    sentences: SentenceDto[];
}