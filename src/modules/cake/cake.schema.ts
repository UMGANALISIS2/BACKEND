import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import  { HydratedDocument } from 'mongoose';

export type CakeDocument = HydratedDocument<Cake>;

@Schema()
export class Cake {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  family: string;

  @Prop()
  flavor: string;

  @Prop()
  ingredients: string[];

  @Prop()
  filling: string;

  @Prop()
  price: number;

  @Prop()
  stock: number;

  @Prop()
  image: string;
  
}

export const CakeSchema = SchemaFactory.createForClass(Cake);