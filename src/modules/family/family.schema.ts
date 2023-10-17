
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Cake } from '../cake/cake.schema';

@Entity()
export class Family {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(type => Cake, cake => cake.family)
  cakes: Cake[];
}