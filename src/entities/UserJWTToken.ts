import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { v4 as uuid } from "uuid"; //generate random id
import { User } from "./User";

@Entity("user_jwt_token")
export class UserJWTToken {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ nullable: false })
  token: string;

  @Column({ nullable: false })
  refresh_token: string;

  @Column({ nullable: false, default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.userJWTToken)
  @JoinTable()
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
