import { Body, Controller, Get, Logger, Param, Post, Query } from '@nestjs/common';
import { CakeService } from './cake.service';
import { Cake } from './cake.schema';
import { CreateCakeDto } from './dto/CreateCakeDto';

@Controller('cake')
export class CakeController{

    constructor(private readonly cakeService: CakeService){}

    @Get('catalog')
    async getCatalog(){
        return this.cakeService.getCakes()
    }

    @Post('create/:type')
    async createCake(@Param('type') type: string, @Body() data: CreateCakeDto){
        var cake = this.cakeService.createCake(type, data.name, data.description, 
            data.flavor, data.filling, data.stock, data.price, data.image);

             return await cake;
    }
}