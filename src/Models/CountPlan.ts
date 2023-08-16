import {
  Entity,
  Column,
  ManyToOne,
  Unique,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { EntityBase } from "./Base";
import { CompanyEntity } from "./User";
import { SubProductEntity } from "./Product";

@Entity()
@Unique("one_type_of_plan_per_user", ["user", "plan"])
export class CountPlanEntity extends EntityBase {
  @Column({ type: "uuid" })
  company_id: string;

  @Column({ type: "datetime" })
  expiration: Date;

  @ManyToOne(() => CompanyEntity)
  @JoinColumn({ name: "company_id" })
  company: never;

  count_plans: any;
}

export enum CountExcecutionStatus {
  // We can add a number of roles here.
  pending = 0,
  end = 1,
}

@Entity()
export class CountExecutionEntity extends EntityBase {
  @Column({ type: "uuid" })
  plan_id: string;

  @Column({
    type: "enum",
    enum: CountExcecutionStatus,
  })
  status: CountExcecutionStatus;

  @ManyToOne(() => CountPlanEntity, (userplan) => userplan.count_plans)
  @JoinColumn({ name: "plan_id" })
  plan: never;
}

@Entity()
export class CountSubProductEntity extends EntityBase {
  // I think CountSubProductEntity is a better name than
  // UserProductCounts
  @Column({ type: "int" })
  quantity: number;

  @Column({ type: "uuid" })
  subproduct_id: string;

  @Column({ type: "uuid" })
  count_execution_id: string;

  @OneToOne(() => CountExecutionEntity)
  @JoinColumn({ name: "count_execution_id" })
  count_execution: never;

  @OneToOne(() => SubProductEntity)
  @JoinColumn({ name: "subproduct_id" })
  subproduct: never;
}
