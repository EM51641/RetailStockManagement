import { BaseEntity, PrimaryColumn } from "typeorm";

export class EntityBase extends BaseEntity {
  @PrimaryColumn({ type: "uuid" })
  id: string;
}

export interface TEntity extends EntityBase {}
