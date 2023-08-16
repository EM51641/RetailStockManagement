import { Product } from "../../Domains/Product";
import { ProductEntity } from "../../Models/Product";
import { IMapper } from "./Base";

export class ProductMapper implements IMapper<ProductEntity, Product> {
  GetEntityFromDomain(product: Product): ProductEntity {
    let record = new ProductEntity();
    record.id = product.Id;
    record.name = product.name;
    record.category_id = product.category_id;
    record.price = product.price;
    record.is_complete = product.is_complete;
    return record;
  }
  GetDomainFromEntity(product_entity: ProductEntity): Product {
    const product = new Product(
      product_entity.id,
      product_entity.price,
      product_entity.name,
      product_entity.category_id,
      product_entity.company_id,
      product_entity.is_complete,
    );
    return product;
  }

  TransferDomainToEntity(record: ProductEntity, product: Product): void {
    record.name = product.name;
    record.price = product.price;
    record.category_id = product.category_id;
    record.is_complete = product.is_complete;
    record.company_id = product.company_id;
  }
}
