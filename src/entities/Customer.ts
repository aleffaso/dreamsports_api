import { Exclude } from "class-transformer";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid"; //generate random id
import { CustomerRefreshToken } from "./CustomerRefreshToken";

@Entity("customers")
export class Customer {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: false })
  email: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  zipCode: string;

  @Column({ nullable: false })
  streetAddress: string;

  @Column({ nullable: true })
  numberAddress: string;

  @Column({ nullable: true })
  referenceAddress: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  state: string;

  @Column({ nullable: false })
  country: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  @BeforeUpdate()
  generateFullName() {
    this.fullName = `${this.firstName} ${this.lastName}`;
  }

  @OneToMany(
    () => CustomerRefreshToken,
    (customerRefreshToken) => customerRefreshToken.customer
  )
  @JoinTable()
  refresh_token: CustomerRefreshToken;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
