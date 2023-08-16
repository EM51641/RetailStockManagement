import { Product } from "../../Domains/Product";
import { v4 } from "uuid";
import { BaseService } from "../Base";
import { UnitOfWork } from "../../Units/Base";
import { AdminRepository, UserRepository } from "../../Repositories/User";
import {
  CategoryRepository,
  ProductRepository,
} from "../../Repositories/Product";

type ProductCreationDTO = {
  name: string;
  price: number;
  category_name: string;
  user_id: string;
};

interface IAddProductService {
  addProduct(product: ProductCreationDTO): void;
  get product_repository(): ProductRepository;
  get category_repository(): CategoryRepository;
  get admin_repository(): AdminRepository;
  get user_repository(): UserRepository;
}

export class AddProductService
  extends BaseService
  implements IAddProductService
{
  private readonly _product_repository: ProductRepository;
  private readonly _category_repository: CategoryRepository;
  private readonly _admin_repository: AdminRepository;
  private readonly _user_repository: UserRepository;

  constructor(unit_of_work: UnitOfWork) {
    super(unit_of_work);
    this._product_repository = new ProductRepository(unit_of_work.context);
    this._category_repository = new CategoryRepository(unit_of_work.context);
    this._admin_repository = new AdminRepository(unit_of_work.context);
    this._user_repository = new UserRepository(unit_of_work.context);
  }

  get product_repository(): ProductRepository {
    return this._product_repository;
  }

  get category_repository(): CategoryRepository {
    return this._category_repository;
  }

  get admin_repository(): AdminRepository {
    return this._admin_repository;
  }

  get user_repository(): UserRepository {
    return this._user_repository;
  }

  public async addProduct(data: ProductCreationDTO): Promise<void> {
    const id = v4();
    const category = await this.category_repository.findByName(
      data.category_name,
    );
    const admin = await this.get_allowed_user(data.user_id);
    const user = await this._user_repository.FindById(data.user_id);

    let product = new Product(
      id,
      data.price,
      data.name,
      category.Id,
      user.company_id,
      false,
    );
    this.product_repository.add(product);
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
}
