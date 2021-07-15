import { Router } from 'express';
import {createSpecificationController} from "../modules/cars/useCases/createSpecification/index";
import {listSpecificationController} from "../modules/cars/useCases/listSpecifications/index";

const specificationsRoutes = Router();

specificationsRoutes.get("/", (request, response) => {
    return listSpecificationController.handle(request, response);
});

specificationsRoutes.post("/", (request, response) => {
    return createSpecificationController.handle(request, response);
});

export { specificationsRoutes }