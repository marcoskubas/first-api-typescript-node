import {CategoriesRepositoryInMemory} from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import {CreateCategoryUseCase} from "./CreateCategoryUseCase";
import {AppError} from "../../../../errors/AppError";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {

    beforeEach(() => {
        categoriesRepositoryInMemory    = new CategoriesRepositoryInMemory();
        createCategoryUseCase           = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    });

    it("should be able to create a new category", async() => {
        const category = {
            name: "Category Test",
            description: "Category description Text"
        };
        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        });
        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);
        console.log(categoryCreated);
        expect(categoryCreated).toHaveProperty("id");
    });

    it("should not be able to create a new category with name exists", async() => {
        await expect(async () => {
            const category = {
                name: "Category Test",
                description: "Category description Text"
            };
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            });
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});