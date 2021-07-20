import {Router} from 'express';
import createCategoryController from "../modules/cars/useCases/createCategory/index";
import listCategoryController from "../modules/cars/useCases/listCategories/index";
import importCategoryController from "../modules/cars/useCases/importCategory/index";
import multer from "multer";

const categoriesRoutes = Router();
const upload = multer({
    dest: './tmp'
});

categoriesRoutes.get("/", (request, response) => {
    return listCategoryController().handle(request, response);
});

categoriesRoutes.post("/", (request, response) => {
    return createCategoryController().handle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
    return importCategoryController().handle(request, response);
})

export { categoriesRoutes }