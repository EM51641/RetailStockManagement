import { DomainBase } from "./Base";

export class Category extends DomainBase {
  constructor(
    uid: string,
    private _name: string,
  ) {
    super(uid);
  }

  get name() {
    return this._name;
  }
}

export class Product extends DomainBase {
  constructor(
    uid: string,
    private _price: number,
    private _name: string,
    private _category_id: string,
    private _company_id: string,
    private _is_complete: boolean,
  ) {
    super(uid);
  }

  get price() {
    return this._price;
  }

  get name() {
    return this._name;
  }

  get category_id() {
    return this._category_id;
  }

  get is_complete() {
    return this._is_complete;
  }

  get company_id() {
    return this._company_id;
  }

  set_complete() {
    this._is_complete = true;
  }

  set_incomplete() {
    this._is_complete = false;
  }

  set_price(price: number) {
    this._price = price;
  }
}

export class SubProduct extends DomainBase {
  constructor(
    uid: string,
    private _name: string,
    private _product_id: string,
  ) {
    super(uid);
  }

  get name() {
    return this._name;
  }

  get product_id() {
    return this._product_id;
  }
}

export class Barcode extends DomainBase {
  constructor(
    uid: string,
    private _sku: string,
    private _subproduct_id: string,
  ) {
    super(uid);
  }

  get sku() {
    return this._sku;
  }

  get subproduct_id() {
    return this._subproduct_id;
  }
}
