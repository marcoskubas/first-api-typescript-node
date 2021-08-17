import {CreateCarUseCase} from "@modules/cars/useCases/createCar/CreateCarUseCase";
import {CarsRepositoryInMemory} from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase       = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("should be able to create a new car", async() => {
        await createCarUseCase.execute({
            name: "Ka",
            description: "Hatch",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Ford",
            category_id: 1
        });
    });

});