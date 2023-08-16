import { Company } from "../../Domains/User";
import { CompanyEntity } from "../../Models/User";
import { IMapper } from "./Base";

export class CompanyMapper implements IMapper<CompanyEntity, Company> {
  GetEntityFromDomain(company: Company): CompanyEntity {
    const record = new CompanyEntity();
    record.id = company.Id;
    record.name = company.name;
    return record;
  }

  GetDomainFromEntity(company_entity: CompanyEntity): Company {
    const company = new Company(company_entity.id, company_entity.name);
    return company;
  }

  TransferDomainToEntity(record: CompanyEntity, company: Company): void {
    record.id = company.Id;
    record.name = company.name;
  }
}
