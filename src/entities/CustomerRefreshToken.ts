import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
} from "typeorm";
import { v4 as uuid } from "uuid"; //generate random id
import { Customer } from "./Customer";

@Entity("customer_refresh_token")
export class CustomerRefreshToken {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ nullable: false })
  expiresIn: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Customer, (customer) => customer.refresh_token)
  @JoinTable()
  customer: Customer;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
