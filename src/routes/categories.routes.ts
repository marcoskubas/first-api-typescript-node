import {request, response, Router} from 'express';
import {CategoriesRepository} from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.get("/", (request, response) => {
    const all = categoriesRepository.list();
    return response.json(all);
});

categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body;
    categoriesRepository.create({name, description});
    return response.status(201).send();
});

export { categoriesRoutes }