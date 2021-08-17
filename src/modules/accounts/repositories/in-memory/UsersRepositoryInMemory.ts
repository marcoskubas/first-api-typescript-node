import {IUsersRepository} from "@modules/accounts/repositories/IUsersRepository";
import {User} from "@modules/accounts/infra/typeorm/entities/User";
import {ICreateUserDTO} from "@modules/accounts/dtos/ICreateUserDTO";

class UsersRepositoryInMemory implements IUsersRepository{

    users: User[] = [];

    async create({driver_license, email, name, password}: ICreateUserDTO): Promise<void> {
        const user = new User();
        Object.assign(user, {driver_license, email, name, password});
        this.users.push(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.users.find(user => user.email === email);
        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.users.find(user => user.id === id);
        return user;
    }

}

export { UsersRepositoryInMemory }