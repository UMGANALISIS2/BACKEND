import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cake } from './cake.schema';
import { Subject } from 'rxjs';
import { Cron } from '@nestjs/schedule';
import { CakeFactory } from './factory/CakeFactory';
import { CakeQueryDto } from './dto/CakeQuery.dto';
import { QueryDto } from './dto/QueryDto';

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

      public async filterCakes(query: CakeQueryDto){
        var mongoQ = this.buildMongoQuery(query);
        console.log(mongoQ)
        var results: Cake[] = await this.cakeModel.find(mongoQ)

        return results;
      }

      @Cron("1 0 0 0 0 0", {name: 'discount'})
      public reduceStock(){
        Logger.log("ola")
      }

      private buildMongoQuery(query: CakeQueryDto){
        const mongoQuery = {};
        for(const sentence of query.sentences){
            const field = sentence.field;
            const operator = sentence.operator;
            const values = sentence.value;

            if (operator === 'equals') {
                mongoQuery[field] = { $eq: values.toString() };
              } else if (operator === 'distinct') {
                mongoQuery[field] = { $ne: values[0] };
              } else if (operator === 'major') {
                mongoQuery[field] = { $gt: values[0] };
              } else if (operator === 'minus') {
                mongoQuery[field] = { $lt: values[0] };
              } else if (operator === 'or') {
                if (!mongoQuery[field]) {
                  mongoQuery[field] = { $in: values };
                } else {
                  mongoQuery[field].$in = values;
                }
              } else if (operator === 'not') {
                if (!mongoQuery[field]) {
                  mongoQuery[field] = { $nin: values };
                } else {
                  mongoQuery[field].$nin = values;
                }
              }
        }    
        return mongoQuery;
      }
}