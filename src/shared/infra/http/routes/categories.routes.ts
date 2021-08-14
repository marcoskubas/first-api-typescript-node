import {Router} from 'express';
import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import {ensureAuthenticate} from "@shared/infra/http/middlewares/ensureAuthenticate";
import multer from "multer";

const categoriesRoutes = Router();
const upload = multer({
    dest: './tmp'
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController   = new ListCategoriesController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", ensureAuthenticate, listCategoryController.handle);

categoriesRoutes.post("/import", upload.single("file"), importCategoryController.handle)

export { categoriesRoutes }