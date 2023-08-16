import { v4 } from "uuid";
import { Company } from "../../Domains/User";
import { CompanyRepository } from "../../Repositories/Company";
import { UnitOfWork } from "../../Units/Base";
import { BaseService } from "../Base";

export type CompanyCreatorDTO = {
  name: string;
};

interface ICompanyCreatorService {
  create_company(data: CompanyCreatorDTO): Promise<void>;
  get unit_of_work(): UnitOfWork;
}

export class CompanyCreatorService
  extends BaseService
  implements ICompanyCreatorService
{
  private _company_repository: CompanyRepository;
  constructor(unit_of_work: UnitOfWork) {
    super(unit_of_work);
    this._company_repository = new CompanyRepository(unit_of_work.context);
  }
  async create_company(data: CompanyCreatorDTO): Promise<void> {
    const id = v4();
    let company = new Company(id, data.name);
    this._company_repository.add(company);
    this._unit_of_work.save();
  }
}
