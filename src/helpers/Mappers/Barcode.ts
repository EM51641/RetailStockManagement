import { Barcode } from "../../Domains/Product";
import { BarcodeEntity } from "../../Models/Product";
import { IMapper } from "./Base";

export class BarcodeMapper implements IMapper<BarcodeEntity, Barcode> {
  GetEntityFromDomain(domain: Barcode): BarcodeEntity {
    const entity = new BarcodeEntity();
    entity.id = domain.Id;
    entity.sku = domain.sku;
    entity.subproduct_id = domain.subproduct_id;
    return entity;
  }
  GetDomainFromEntity(entity: BarcodeEntity): Barcode {
    const domain = new Barcode(entity.id, entity.sku, entity.subproduct_id);
    return domain;
  }

  TransferDomainToEntity(entity: BarcodeEntity, domain: Barcode): void {
    entity.sku = domain.sku;
    entity.subproduct_id = domain.subproduct_id;
  }
}
