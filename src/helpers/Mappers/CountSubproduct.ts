import { CountSubProduct } from "../../Domains/CountPlan";
import { CountSubProductEntity } from "../../Models/CountPlan";
import { IMapper } from "./Base";

export class CountSubProductMapper
  implements IMapper<CountSubProductEntity, CountSubProduct>
{
  GetEntityFromDomain(count_subproduct: CountSubProduct) {
    let record = new CountSubProductEntity();
    record.id = count_subproduct.Id;
    record.count_execution_id = count_subproduct.count_execution_id;
    record.subproduct_id = count_subproduct.subproduct_id;
    record.quantity = count_subproduct.quantity;
    return record;
  }

  GetDomainFromEntity(count_subproduct_entity: CountSubProductEntity) {
    const count_subproduct = new CountSubProduct(
      count_subproduct_entity.id,
      count_subproduct_entity.subproduct_id,
      count_subproduct_entity.count_execution_id,
      count_subproduct_entity.quantity,
    );
    return count_subproduct;
  }

  TransferDomainToEntity(
    record: CountSubProductEntity,
    count_subproduct: CountSubProduct,
  ) {
    record.count_execution_id = count_subproduct.count_execution_id;
    record.subproduct_id = count_subproduct.subproduct_id;
    record.quantity = count_subproduct.quantity;
  }
}
