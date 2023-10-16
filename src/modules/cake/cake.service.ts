import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cake } from './cake.schema';
import { Subject } from 'rxjs';
import { Cron } from '@nestjs/schedule';
import { CakeFactory } from './factory/CakeFactory';

@Injectable()
export class CakeService{

    private catalog: Cake[] = [];
    private catalogSubject = new Subject<Cake[]>();

    constructor(@InjectModel('Cake') private readonly cakeModel: Model<Cake>,
    private readonly cakeFactory: CakeFactory){
        this.initialCatalog()
        .then((c) => {
            this.catalog = c;
        })
        .catch((e) => {
            Logger.error("Error al obtener el catálogo inicial.", "Catalogo");
            this.catalog = [];
        })
    }

    private getCatalog(): Cake[]{
        return this.catalog;
    }

    private async initialCatalog(): Promise<Cake[]>{
        return await this.cakeModel.find({});
    }

    public getCakes(): Cake[]{
        const catalog = this.getCatalog();
        return catalog;
    }

    private addToCatalog(cake: Cake){
        this.catalog.push(cake);
        this.catalogSubject.next(this.catalog);
    }

    async findCakes(): Promise<Cake[]> {

        return this.cakeModel.find({
        })
    }

    async createCake(type: string, name: string, ingredients: string[], description: string, flavor: string, 
        filling: string, stock: number, price:number, image: string): Promise<Cake> {
            const factory = this.cakeFactory.getFactory(type);
            var cake = factory.createCake(name, description, ingredients, flavor, filling, stock, price, image);
            var creation = new this.cakeModel(cake);
            await creation.save()
            this.addToCatalog(creation);
            return creation;
      }

      @Cron("1 0 0 0 0 0", {name: 'discount'})
      public reduceStock(){
        Logger.log("ola")
      }
}