import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { EntityBase } from "./Base";

@Entity()
export class CompanyEntity extends EntityBase {
  @Column({ type: "varchar" })
  name: string;
}

@Entity()
export class UserEntity extends EntityBase {
  @Column({ type: "nvarchar" })
  firstName: string;

  @Column({ type: "nvarchar" })
  lastName: string;

  @Column({ type: "uuid" })
  company_id: string;

  @Column({ type: "boolean" })
  is_active: boolean;

  @Column({ type: "boolean" })
  is_admin: boolean;

  @Column({ type: "date" })
  created_at: Date;

  @Column({ type: "nvarchar", unique: true, nullable: true })
  email?: string;

  @Column({ type: "nvarchar", nullable: true })
  password?: string;

  @OneToOne(() => CompanyEntity, { cascade: true })
  @JoinColumn({ name: "company_id" })
  private company: never;

  plans: any;
}
