import { Injectable, Logger } from '@nestjs/common';
import { CakeFactory } from "../cake.interface";
import { Cake } from "../cake.schema";

@Injectable()
export class ColdCakeFactory implements CakeFactory{
    createCake(name: string, description: string, flavor: string, filling: string, stock: number, price: number, image: string): Cake {
        Logger.log("Creating from cold", "Cold cake")
        var cake = new Cake();
        cake.name = name;
        cake.description = description;
        cake.family = 'cold';
        cake.flavor = flavor;
        cake.filling = filling;
        cake.stock = stock;
        cake.price = price;
        cake.image = image;
        return cake;
    }
}