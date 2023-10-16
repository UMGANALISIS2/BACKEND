import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cake } from './cake.schema';
import { BakedCakeFactory } from './factory/BakedCake';
import { CakeFactory } from './cake.interface';
import { ColdCakeFactory } from './factory/ColdCake';
import { YogurtCakeFactory } from './factory/YogurtCake';
import { Subject } from 'rxjs';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CakeService{

    private catalog: Cake[] = [];
    private catalogSubject = new Subject<Cake[]>();

    constructor(@InjectModel('Cake') private readonly cakeModel: Model<Cake>,
    private readonly bakedCakeFactory: BakedCakeFactory,
    private readonly coldCakeFactory: ColdCakeFactory,
    private readonly yogurtCakeFactory: YogurtCakeFactory){
        this.initialCatalog()
        .then((c) => {
            this.catalog = c;
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

    async createCake(type: string, name: string, description: string, flavor: string, 
        filling: string, stock: number, price:number, image: string): Promise<Cake> {
        let factory: CakeFactory;

        switch (type) {
            case 'baked':
                factory = this.bakedCakeFactory;
            break;
            case 'cold':
                factory = this.coldCakeFactory;
            break;
            case 'yogurt':
                factory = this.yogurtCakeFactory;
            break;
        }

        var cake = factory.createCake(name, description, flavor, filling, stock, price, image);
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