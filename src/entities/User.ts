import { Exclude } from "class-transformer";
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinTable,
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid"; //generate random id
import { UserJWTToken } from "./UserJWTToken";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true })
  admin: boolean;

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserJWTToken, (userJWTToken) => userJWTToken.user)
  @JoinTable()
  userJWTToken: UserJWTToken;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
