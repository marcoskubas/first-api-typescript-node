import { Router } from 'express';
import {SpecificationsRepository} from "../modules/cars/repositories/SpecificationsRepository";
import {CreateSpecificationService} from "../modules/cars/services/CreateSpecificationService";

const specificationsRoutes = Router();

const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.get("/", (request, response) => {
    const all = specificationsRepository.list();
    return response.json(all);
});

specificationsRoutes.post("/", (request, response) => {
    const { name, description } = request.body;
    const createSpecificationService = new CreateSpecificationService(specificationsRepository);
    try {
        createSpecificationService.execute({name, description});
    }catch (e) {
        console.log(e.toString());
        return response.status(400).json({error: e.toString()})
    }
    return response.status(201).send();
});

export { specificationsRoutes }