import {inject, injectable} from "tsyringe";
import { hash } from "bcrypt";
import {IUsersRepository} from "../../repositories/IUsersRepository";
import {ICreateUserDTO} from "../../dtos/ICreateUserDTO";
import {AppError} from "../../../../errors/AppError";

@injectable()
class CreateUserUseCase{

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    )
    {}

    async execute({name, password, email, driver_license}: ICreateUserDTO): Promise<void>{
        const usersAlreadyExists = await this.usersRepository.findByEmail(email);
        if(usersAlreadyExists){
            throw new AppError("User already exists!");
        }
        const passwordHash = await hash(password, 8);
        await this.usersRepository.create({
            name,
            password: passwordHash,
            email,
            driver_license
        });
    }
}

export { CreateUserUseCase }