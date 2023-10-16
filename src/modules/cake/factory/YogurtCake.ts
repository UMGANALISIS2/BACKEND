import { Injectable, Logger } from "@nestjs/common";
import { ICakeFactory } from "../cake.interface";
import { Cake } from "../cake.schema";

@Injectable()
export class YogurtCakeFactory implements ICakeFactory{
    createCake(name: string, description: string, ingredients: string[], flavor: string, filling: string, stock: number, price: number, image: string): Cake {
        Logger.log("Creating from yogurt", "Yogurt cake")
        var cake = new Cake();
        cake.name = name;
        cake.description = description;
        cake.family = 'yogurt';
        cake.flavor = flavor;
        cake.filling = filling;
        cake.ingredients = ingredients;
        cake.stock = stock;
        cake.price = price;
        cake.image = image;
        return cake;
    }
}