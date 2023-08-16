import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, EntityManager, QueryRunner } from "typeorm";
import { Events, SessionManager } from "../Session/Session";

interface IUnitOfWorkBase {
  get context(): SessionManager;
  save(): void;
}

@Injectable()
export abstract class UnitOfWork implements IUnitOfWorkBase {
  private _context: SessionManager;

  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this._context = new SessionManager();
  }

  get context(): SessionManager {
    return this._context;
  }

  public async save(): Promise<void> {
    const connection = await this.get_db_connection();
    await this.start_transaction(connection);
  }

  private async get_db_connection(): Promise<QueryRunner> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    return queryRunner;
  }

  private async start_transaction(connection: QueryRunner): Promise<void> {
    await connection.startTransaction();
    try {
      await this._bulk_save(connection.manager);
      await connection.commitTransaction();
    } catch (e) {
      await connection.rollbackTransaction();
    }
  }

  private async _bulk_save(manager: EntityManager) {
    for (const event of this._context.events) {
      await this._save(event, manager);
    }
  }

  private async _save(event: Events, manager: EntityManager): Promise<void> {
    switch (event.type) {
      case "add":
        await manager.save(event.entity);
        break;
      case "modify":
        await manager.save(event.entity);
        break;
      case "remove":
        await manager.remove(event.entity);
        break;
    }
  }
}
