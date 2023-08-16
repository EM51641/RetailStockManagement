import { TEntity } from "../Models/Base";

export type Events = {
  entity: TEntity;
  type: "add" | "remove" | "modify";
};

type Session = {
  events: Events[];
};

interface ISessionManager {
  get session(): Session;
  get events(): Events[];
  add(entity: TEntity): void;
  remove(entity: TEntity): void;
  modify(entity: TEntity): void;
}

export class SessionManager implements ISessionManager {
  private _session: Session;

  constructor() {
    this._session = { events: [] };
  }

  get session() {
    return this._session;
  }

  get events() {
    return this._session.events;
  }

  add(entity: TEntity): void {
    this._session.events.push({ entity: entity, type: "add" });
  }

  remove(entity: TEntity): void {
    this._session.events.push({ entity: entity, type: "remove" });
  }

  modify(entity: TEntity): void {
    this._session.events.push({ entity: entity, type: "modify" });
  }
}
