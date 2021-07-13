import {ICategoriesRepository, ICreateCategoryDTO} from "./ICategoriesRepository";
import {Category} from "../models/Category";

class PostgresCategoriesRepository implements ICategoriesRepository{
    create({name, description}: ICreateCategoryDTO): void {
        console.log(name, description);
        return null;
    }

    findByName(name: string): Category {
        console.log(name);
        return null;
    }

    list(): Category[] {
        console.log('list');
        return null;
    }
}

export { PostgresCategoriesRepository }