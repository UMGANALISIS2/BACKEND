import { Cake } from "./cake.schema";

export interface ICakeFactory{
    createCake(name: string, description: string, ingredients: string[], flavor: string, filling: string, stock: number, price: number, image: string): Cake;
}