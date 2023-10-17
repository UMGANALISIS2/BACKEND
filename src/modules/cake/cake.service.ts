import { Injectable, Logger } from '@nestjs/common';
import { Cake } from './cake.schema';
import { Subject } from 'rxjs';
import { Cron } from '@nestjs/schedule';
import { CakeFactory } from './factory/CakeFactory';
import { CakeQueryDto } from './dto/CakeQuery.dto';
import { SentenceDto } from './dto/SentenceDto';
import { SearchInterpreter } from './interpreter/SearchInterpreter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CakeService{

    private catalog: Cake[] = [];
    private catalogSubject = new Subject<Cake[]>();

    constructor(@InjectRepository(Cake)
    private cakeRepository: Repository<Cake>,
    private readonly cakeFactory: CakeFactory,
    private readonly searchInterpreter: SearchInterpreter){
        this.initialCatalog()
        .then((c) => {
            this.catalog = c;
        })
        .catch((e) => {
            Logger.error("Error al obtener el catálogo inicial. " + e, "Catalogo");
            this.catalog = [];
        })
    }

    private getCatalog(): Cake[]{
        return this.catalog;
    }

    private async initialCatalog(): Promise<Cake[]>{
        const data = await this.cakeRepository
        .createQueryBuilder("Cake")
        .leftJoinAndSelect("Cake.family", "Family")
        .getMany();

        return await data;
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

        return this.cakeRepository.find({
        })
    }

    async createCake(type: string, name: string, ingredients: string[], description: string, flavor: string, 
        filling: string, stock: number, price:number, image: string): Promise<Cake> {
            const factory = this.cakeFactory.getFactory(type);
            var cake = factory.createCake(name, description, ingredients, flavor, filling, stock, price, image);
            var creation = new Cake()
            await this.cakeRepository.save(creation);
            this.addToCatalog(creation);
            return creation;
      }

      public async filterCakes(query: CakeQueryDto){
        var results: Cake[] = await this.cakeRepository.find();

        return results;
      }

      @Cron("1 0 0 0 0 0", {name: 'discount'})
      public reduceStock(){
        Logger.log("ola")
      }

      private buildMongoQuery(sentences: SentenceDto[]){
        for(var sent in sentences){
          console.log(sent);
        }
        return {};
      }
}