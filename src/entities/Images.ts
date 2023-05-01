import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity("images")
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  src: string;

  @Column({ nullable: false, default: false })
  main: boolean;

  @ManyToOne(() => Product, (product) => product.images)
  product: Product;
}
