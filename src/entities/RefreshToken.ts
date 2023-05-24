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
import { User } from "./User";

@Entity("refresh_token")
export class RefreshToken {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ nullable: false })
  expiresIn: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.refresh_token)
  @JoinTable()
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
