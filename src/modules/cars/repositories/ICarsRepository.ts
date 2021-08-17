import {ICreateCarDTO} from "@modules/cars/dtos/ICreateCarDTO";

interface ICarsRepository{
    create({name, description, daily_rate, license_plate, fine_amount, brand, category_id}: ICreateCarDTO):Promise<void>;
}

export { ICarsRepository }