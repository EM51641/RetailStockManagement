import { SubProduct } from "../../Domains/Product";
import { SubProductEntity } from "../../Models/Product";
import { IMapper } from "./Base";

export class SubProductMapper implements IMapper<SubProductEntity, SubProduct> {
  GetEntityFromDomain(subproduct: SubProduct): SubProductEntity {
    const record = new SubProductEntity();
    record.id = subproduct.Id;
    record.product_id = subproduct.product_id;
    record.quantity = subproduct.quantity;
    record.name = subproduct.name;
    return record;
  }
  GetDomainFromEntity(sub_product_entity: SubProductEntity): SubProduct {
    const sub_product = new SubProduct(
      sub_product_entity.id,
      sub_product_entity.name,
      sub_product_entity.product_id,
      sub_product_entity.quantity,
    );
    return sub_product;
  }

  TransferDomainToEntity(
    record: SubProductEntity,
    sub_product: SubProduct,
  ): void {
    record.name = sub_product.name;
    record.product_id = sub_product.product_id;
    record.quantity = sub_product.quantity;
  }
}
