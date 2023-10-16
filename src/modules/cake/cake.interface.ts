import { Cake } from "./cake.schema";

export interface CakeFactory{
    createCake(name: string, description: string, flavor: string, filling: string, stock: number, price: number, image: string): Cake;
}