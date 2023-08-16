import { Company } from "../Domains/User";
import { CompanyMapper } from "../helpers/Mappers/Company";
import { CompanyEntity } from "../Models/User";
import { SessionManager } from "../Session/Session";
import { BaseRepository, BaseRepositoryInterface } from "./Base";

interface ICompanyRepository
  extends BaseRepositoryInterface<CompanyEntity, Company> {}

export class CompanyRepository
  extends BaseRepository<CompanyEntity, Company>
  implements ICompanyRepository
{
  constructor(context: SessionManager) {
    const company_mapper = new CompanyMapper();
    super(context, CompanyEntity, company_mapper);
  }
}
