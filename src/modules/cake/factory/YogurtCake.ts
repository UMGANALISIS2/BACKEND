import { Injectable, Logger } from "@nestjs/common";
import { CakeFactory } from "../cake.interface";
import { Cake } from "../cake.schema";

@Injectable()
export class YogurtCakeFactory implements CakeFactory{
    createCake(name: string, description: string, flavor: string, filling: string, stock: number, price: number, image: string): Cake {
        Logger.log("Creating from yogurt", "Yogurt cake")
        var cake = new Cake();
        cake.name = name;
        cake.description = description;
        cake.family = 'yogurt';
        cake.flavor = flavor;
        cake.filling = filling;
        cake.stock = stock;
        cake.price = price;
        cake.image = image;
        return cake;
    }
}