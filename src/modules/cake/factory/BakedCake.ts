import { Injectable, Logger } from "@nestjs/common";
import { ICakeFactory } from "../cake.interface";
import { Cake } from "../cake.schema";

@Injectable()
export class BakedCakeFactory implements ICakeFactory{
    createCake(name: string, description: string, ingredients: string[], flavor: string, filling: string, stock: number, price: number, image: string): Cake {
        Logger.log("Creating from baked", "Baked cake")
        var cake = new Cake();
        cake.name = name;
        cake.description = description;
        cake.family = 'baked';
        cake.flavor = flavor;
        cake.filling = filling;
        cake.ingredients = ingredients;
        cake.stock = stock;
        cake.price = price;
        cake.image = image;
        return cake;
    }
}