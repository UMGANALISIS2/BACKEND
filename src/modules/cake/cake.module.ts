import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cake, CakeSchema } from './cake.schema';
import { CakeService } from './cake.service';
import { CakeController } from './cake.controller';
import { BakedCakeFactory } from './factory/BakedCake';
import { ColdCakeFactory } from './factory/ColdCake';
import { YogurtCakeFactory } from './factory/YogurtCake';
import { CakeFactory } from './factory/CakeFactory';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Cake.name,
                schema: CakeSchema
            }
        ])
    ],
    providers: [CakeService, CakeFactory, BakedCakeFactory, ColdCakeFactory, YogurtCakeFactory],
    controllers: [CakeController]
})
export class CakeModule {}
