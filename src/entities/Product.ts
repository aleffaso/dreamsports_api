import slugify from "slugify";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { Color } from "./Color";
import { Size } from "./Size";
import { Image } from "./Images";
import { v4 as uuid } from "uuid";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  rate: number;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  brand: string;

  @Column({ nullable: false })
  info: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  specifications: string;

  @Column({ nullable: false })
  inventory: number;

  @Column({ nullable: false })
  slug: string;

  @Column({ nullable: false, default: true })
  is_active: boolean;

  @OneToMany(() => Category, (category) => category.product)
  categories: Category[];

  @OneToMany(() => Color, (color) => color.product)
  colors: Color[];

  @OneToMany(() => Size, (size) => size.product)
  sizes: Size[];

  @OneToMany(() => Image, (image) => image.product)
  images: Image[];

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    this.slug = slugify(this.title, { lower: true });
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
