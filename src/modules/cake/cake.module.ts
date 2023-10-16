import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cake, CakeSchema } from './cake.schema';
import { CakeService } from './cake.service';
import { CakeController } from './cake.controller';
import { BakedCakeFactory } from './factory/BakedCake';
import { ColdCakeFactory } from './factory/ColdCake';
import { YogurtCakeFactory } from './factory/YogurtCake';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Cake.name,
                schema: CakeSchema
            }
        ])
    ],
    providers: [CakeService, BakedCakeFactory, ColdCakeFactory, YogurtCakeFactory],
    controllers: [CakeController]
})
export class CakeModule {}
