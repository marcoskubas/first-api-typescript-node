import {ListSpecificationsUseCase} from "../listSpecifications/ListSpecificationsUseCase";
import {Request, Response} from "express";
import {container} from "tsyringe";

class ListSpecificationsController{

    async handle(request: Request, response: Response): Promise<Response>{
        const listSpecificationUseCase = container.resolve(ListSpecificationsUseCase);
        const specifications = await listSpecificationUseCase.execute();
        return response.json(specifications);
    }
}

export { ListSpecificationsController }