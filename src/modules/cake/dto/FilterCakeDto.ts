import { IsDecimal, IsNotEmpty, IsNumber, IsUrl } from "class-validator";

export class FilterCakeDto{

    @IsNotEmpty()
    family: string;

}