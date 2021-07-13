import {request, response, Router} from 'express';
import {CategoriesRepository} from "../repositories/CategoriesRepository";
import {CreateCategoryService} from "../services/CreateCategoryService";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.get("/", (request, response) => {
    const all = categoriesRepository.list();
    return response.json(all);
});

categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body;
    const createCategoryService = new CreateCategoryService(categoriesRepository);
    try {
        createCategoryService.execute({name, description});
    }catch (e) {
        return response.status(400).json({error: "Category already exists!"})
    }
    return response.status(201).send();
});

export { categoriesRoutes }