import {
  BaseEntity,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
} from "typeorm";
import { TEntity } from "../Models/Base";
import { TDomain } from "../Domains/Base";
import { IMapper } from "../helpers/Mappers/Base";
import { SessionManager } from "../Session/Session";

type EntityType<T> = { new (): T } & typeof BaseEntity;

export interface BaseRepositoryInterface<E extends TEntity, D extends TDomain> {
  get context(): SessionManager;
  get entity_class(): EntityType<E>;
  add(domain: D): void;
  remove(domain: D): void;
  modify(domain: D): void;
  get mapper(): IMapper<E, D>;
  FindById(uid: string): Promise<D>;
}

export abstract class BaseRepository<E extends TEntity, D extends TDomain>
  implements BaseRepositoryInterface<E, D>
{
  constructor(
    protected _context: SessionManager,
    protected _entity_class: EntityType<E>,
    protected _mapper: IMapper<E, D>,
  ) {}

  get context() {
    return this._context;
  }

  get entity_class() {
    return this._entity_class;
  }
  get mapper() {
    return this._mapper;
  }

  async add(domain: D) {
    const entity = this._mapper.GetEntityFromDomain(domain);
    this._context.add(entity);
  }

  async remove(domain: D) {
    const entity = this._mapper.GetEntityFromDomain(domain);
    this.context.remove(entity);
  }

  async modify(domain: D) {
    let entity = await this._FindFirst({
      where: { id: domain.Id } as FindOptionsWhere<E>,
    });
    this._mapper.TransferDomainToEntity(entity, domain);
    this.context.modify(entity);
  }

  async FindById(uid: string) {
    const entity = await this._FindFirst({
      where: { id: uid } as FindOptionsWhere<E>,
    });
    const domain = this._mapper.GetDomainFromEntity(entity);
    return domain;
  }

  protected async _FindFirst(options: FindOneOptions<E>) {
    const record = await this._entity_class.findOne<E>(options);
    if (!record) {
      throw Error("No data");
    }
    return record;
  }

  protected async _FindAll(options: FindManyOptions<E>) {
    const record = await this._entity_class.find<E>(options);
    return record;
  }
}
