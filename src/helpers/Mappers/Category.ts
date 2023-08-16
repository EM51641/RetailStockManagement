import { Category } from "../../Domains/Product";
import { CategoryEntity } from "../../Models/Product";
import { IMapper } from "./Base";

export class CategoryMapper implements IMapper<CategoryEntity, Category> {
  GetEntityFromDomain(category: Category): CategoryEntity {
    let record = new CategoryEntity();
    record.id = category.Id;
    record.name = category.name;
    return record;
  }
  GetDomainFromEntity(category_entity: CategoryEntity): Category {
    const category = new Category(category_entity.id, category_entity.name);
    return category;
  }
  TransferDomainToEntity(record: CategoryEntity, category: Category): void {
    record.name = category.name;
  }
}
