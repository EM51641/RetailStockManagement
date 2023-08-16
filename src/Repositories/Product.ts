import { Barcode, Category, Product, SubProduct } from "../Domains/Product";
import { BarcodeMapper } from "../helpers/Mappers/Barcode";
import { CategoryMapper } from "../helpers/Mappers/Category";
import { ProductMapper } from "../helpers/Mappers/Product";
import { SubProductMapper } from "../helpers/Mappers/Subproduct";
import {
  BarcodeEntity,
  CategoryEntity,
  ProductEntity,
  SubProductEntity,
} from "../Models/Product";
import { SessionManager } from "../Session/Session";
import { BaseRepository } from "./Base";

interface ICategoryRepository {
  findByName(name: string): Promise<Category>;
}

interface IProductRepository {}
interface ISubProductRepository {}
interface IBarcodeRepository {}

export class CategoryRepository
  extends BaseRepository<CategoryEntity, Category>
  implements ICategoryRepository
{
  constructor(session: SessionManager) {
    const category_mapper = new CategoryMapper();
    super(session, CategoryEntity, category_mapper);
  }

  public async findByName(name: string): Promise<Category> {
    const category_entity = await this._FindFirst({ where: { name: name } });
    const category = this._mapper.GetDomainFromEntity(category_entity);
    return category;
  }
}
export class ProductRepository
  extends BaseRepository<ProductEntity, Product>
  implements IProductRepository
{
  constructor(session: SessionManager) {
    const product_mapper = new ProductMapper();
    super(session, ProductEntity, product_mapper);
  }
}

export class SubProductRepository
  extends BaseRepository<SubProductEntity, SubProduct>
  implements ISubProductRepository
{
  constructor(session: SessionManager) {
    const subproduct_mapper = new SubProductMapper();
    super(session, SubProductEntity, subproduct_mapper);
  }
}

export class BarcodeRepository
  extends BaseRepository<BarcodeEntity, Barcode>
  implements IBarcodeRepository
{
  constructor(session: SessionManager) {
    const barcode_mapper = new BarcodeMapper();
    super(session, BarcodeEntity, barcode_mapper);
  }
}
