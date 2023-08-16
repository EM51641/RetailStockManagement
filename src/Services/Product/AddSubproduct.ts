import { Product, SubProduct } from "../../Domains/Product";
import { v4 } from "uuid";
import { BaseService } from "../Base";
import { UnitOfWork } from "../../Units/Base";
import { AdminRepository, UserRepository } from "../../Repositories/User";
import {
  ProductRepository,
  SubProductRepository,
} from "../../Repositories/Product";
import { User } from "../../Domains/User";

type SubProductCreationDTO = {
  name: string;
  product_id: string;
  quantity: number;
  user_id: string;
};

interface IAddSubProductService {
  addSubProduct(product: SubProductCreationDTO): void;
  get subproduct_repository(): SubProductRepository;
  get product_repository(): ProductRepository;
  get admin_repository(): AdminRepository;
  get user_repository(): UserRepository;
}

export class AddSubProductService
  extends BaseService
  implements IAddSubProductService
{
  private readonly _subproduct_repository: SubProductRepository;
  private readonly _product_repository: ProductRepository;
  private readonly _admin_repository: AdminRepository;
  private readonly _user_repository: UserRepository;

  constructor(unit_of_work: UnitOfWork) {
    super(unit_of_work);
    this._subproduct_repository = new SubProductRepository(
      unit_of_work.context,
    );
    this._product_repository = new ProductRepository(unit_of_work.context);
    this._admin_repository = new AdminRepository(unit_of_work.context);
    this._user_repository = new UserRepository(unit_of_work.context);
  }

  get subproduct_repository(): SubProductRepository {
    return this._subproduct_repository;
  }

  get product_repository(): ProductRepository {
    return this._product_repository;
  }

  get admin_repository(): AdminRepository {
    return this._admin_repository;
  }

  get user_repository(): UserRepository {
    return this._user_repository;
  }

  public async addSubProduct(data: SubProductCreationDTO): Promise<void> {
    const id = v4();
    const product = await this._product_repository.FindById(data.product_id);
    await this.get_allowed_user(data.user_id);

    const user = await this._user_repository.FindById(data.user_id);
    this.is_user_authorized_to_see_product(user, product);

    const subproduct = new SubProduct(id, data.name, product.Id, data.quantity);
    this._subproduct_repository.add(subproduct);
    this.unit_of_work.save();
  }

  private async get_allowed_user(uid: string) {
    try {
      const admin = await this._admin_repository.get_admin_by_user_id(uid);
      return admin;
    } catch (e) {
      throw new Error("User is not allowed to add products");
    }
  }

  private is_user_authorized_to_see_product(user: User, product: Product) {
    if (user.company_id !== product.company_id) {
      throw new Error("User is not allowed to add products");
    }
  }
}
