import {Specification} from "../../entities/Specification";
import {ISpecificationsRepository, ICreateSpecificationDTO} from "../ISpecificationsRepository";
import {getRepository, Repository} from "typeorm";

class SpecificationsRepository implements ISpecificationsRepository{

    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<void>{
        const specification = this.repository.create({
            name,
            description
        });
        console.log('SpecificationsRepository async create');
        console.log(specification);
        await this.repository.save(specification);
    }

    async list(): Promise<Specification[]>{
        const specifications = await this.repository.find();
        return specifications;
    }

    async findByName(name: string): Promise<Specification>{
        const specification = await this.repository.findOne({name});
        return specification;
    }
}

export { SpecificationsRepository }