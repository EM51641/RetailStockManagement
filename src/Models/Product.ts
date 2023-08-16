import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  Unique,
} from "typeorm";
import { EntityBase } from "./Base";
import { CompanyEntity } from "./User";

@Entity()
export class CategoryEntity extends EntityBase {
  @Column({ unique: true })
  name: string;
}

@Entity()
export class ProductEntity extends EntityBase {
  @Column({ type: "uuid" })
  category_id: string;

  @Column({ type: "uuid" })
  company_id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: "float" })
  price: number;

  @Column({ type: "boolean" })
  is_complete: boolean;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: "category_id" })
  category: never;

  @ManyToOne(() => CompanyEntity)
  @JoinColumn({ name: "company_id" })
  company: never;
}

@Entity()
@Unique(["name", "product_id"])
export class SubProductEntity extends EntityBase {
  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "uuid" })
  product_id: string;

  @OneToOne(() => ProductEntity)
  @JoinColumn({ name: "product_id" })
  product: never;

  counts: any;
}

@Entity()
export class BarcodeEntity extends EntityBase {
  @Column({ type: "uuid" })
  sku: string;

  @Column({ type: "uuid" })
  subproduct_id: string;

  @ManyToOne(() => SubProductEntity)
  @JoinColumn({ name: "subproduct_id" })
  subproduct: never;
}
