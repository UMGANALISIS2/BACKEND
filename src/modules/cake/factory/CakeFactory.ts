import { Injectable } from '@nestjs/common';
import { ICakeFactory } from '../cake.interface';
import { BakedCakeFactory } from './BakedCake';
import { ColdCakeFactory } from './ColdCake';
import { YogurtCakeFactory } from './YogurtCake';

@Injectable()
export class CakeFactory{
    constructor(){}

    public getFactory(type: string): ICakeFactory{
        let factory: ICakeFactory = null;
        switch(type){
            case 'baked':
                factory = new BakedCakeFactory();
            break;
            case 'cold':
                factory = new ColdCakeFactory();
            break;
            case 'yogurt':
                factory = new YogurtCakeFactory();
            break;
        }
        return factory;
    }
}