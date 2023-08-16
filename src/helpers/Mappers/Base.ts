import { TDomain } from "../../Domains/Base";
import { TEntity } from "../../Models/Base";

export interface IMapper<E extends TEntity, D extends TDomain> {
  GetDomainFromEntity(entity: E): D;
  GetEntityFromDomain(domain: D): E;
  TransferDomainToEntity(entity: E, domain: D): void;
}