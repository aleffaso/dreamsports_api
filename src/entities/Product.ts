import slugify from "slugify";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./Category";
import { Color } from "./Color";
import { Size } from "./Size";
import { Image } from "./Image";
import { Brand } from "./Brand";
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => Brand, (brand) => brand.product)
  @JoinTable()
  brands: Brand[];

  @ManyToMany(() => Color, (color) => color.product)
  @JoinTable()
  colors: Color[];

  @ManyToMany(() => Size, (size) => size.product)
  @JoinTable()
  sizes: Size[];

  @ManyToMany(() => Image, (image) => image.product)
  @JoinTable()
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
