import {AuthenticateUserUseCase} from "@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase";
import {UsersRepositoryInMemory} from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import {CreateUserUseCase} from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import {ICreateUserDTO} from "@modules/accounts/dtos/ICreateUserDTO";
import {AppError} from "@shared/errors/AppError";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUsersUseCase : CreateUserUseCase;

describe("Authenticate User", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUsersUseCase      = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("should be able to authenticate an user", async() => {

        const user: ICreateUserDTO = {
            driver_license: "000123",
            email: "user@test.com",
            password: "1234",
            name: "User Test"
        };
        await createUsersUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });

        console.log(result);

        expect(result).toHaveProperty("token");

    });

    it("should not be able to authenticate a not exists user", async() => {
        await expect(async() => {
            await authenticateUserUseCase.execute({
                email: "false@test.com",
                password: "test"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to authenticate with incorret password", async() => {
        await expect(async() => {

            const user: ICreateUserDTO = {
                driver_license: "99999",
                email: "user@user.com",
                password: "1234",
                name: "User Test Error"
            };
            await createUsersUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "12345"
            });

        }).rejects.toBeInstanceOf(AppError);
    });

})