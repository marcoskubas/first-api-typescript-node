import {ICategoriesRepository} from "../../repositories/ICategoriesRepository";
import {Category} from "../../models/Category";

class ListCategoriesUseCase{
    constructor(private categoriesRepository : ICategoriesRepository) {

    }

    execute(): Category[]{
        const categories = this.categoriesRepository.list();
        return categories;
    }
}

export { ListCategoriesUseCase }