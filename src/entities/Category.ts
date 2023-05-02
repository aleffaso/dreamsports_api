import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";
import slugify from "slugify";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  href: string;

  @Column({ nullable: false })
  src: string;

  @Column({ nullable: false })
  slug: string;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product;

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    this.slug = slugify(this.title, { lower: true });
  }
}
