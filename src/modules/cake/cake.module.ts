import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cake } from './cake.schema';
import { CakeService } from './cake.service';
import { CakeFactory } from './factory/CakeFactory';
import { SearchInterpreter } from './interpreter/SearchInterpreter';
import { BakedCakeFactory } from './factory/BakedCake';
import { ColdCakeFactory } from './factory/ColdCake';
import { YogurtCakeFactory } from './factory/YogurtCake';
import { CakeController } from './cake.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Cake])
    ],
    providers: [CakeService, CakeFactory, SearchInterpreter, BakedCakeFactory, ColdCakeFactory, YogurtCakeFactory],
    controllers: [CakeController]
})
export class CakeModule {}
