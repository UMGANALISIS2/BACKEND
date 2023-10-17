import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Family } from "../family/family.schema";

@Entity()
export class Cake{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToOne(type => Family)
  @JoinColumn({
    name: 'family'
  })
  family: Family;
  

  @Column()
  flavor: string;

  @Column()
  filling: string;

  @Column({
    type: 'decimal',
    precision: 2
  })
  price: number;

  @Column({
    type: 'int'
  })
  stock: number;

  @Column()
  image: string;

}
