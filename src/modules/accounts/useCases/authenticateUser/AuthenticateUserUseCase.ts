import "reflect-metadata";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import {inject, injectable} from "tsyringe";

import {IUsersRepository} from "@modules/accounts/repositories/IUsersRepository";
import {AppError} from "@errors/AppError";

interface IRequest{
    email: string;
    password: string;
}

interface IResponse{
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase{

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    )
    {}

    async execute({email, password}: IRequest):Promise<IResponse>{
        //Check User Exists
        const user = await this.usersRepository.findByEmail(email);
        if(!user){
            throw new AppError("E-mail or password incorrect!");
        }
        //Check Correct Password
        const passwordMatch = await compare(password, user.password);
        if(!passwordMatch){
            throw new AppError("E-mail or password incorrect!");
        }
        //Generate JsonWebToken
        const token = sign({}, "47f995461d41e63aa7162936740b003a", {
            subject: user.id,
            expiresIn: "1d"
        }); //md5('marcoskubasignite')

        const tokenReturn: IResponse = {
            user: {
                name: user.name,
                email: user.email
            },
            token
        }

        return tokenReturn;

    }
}

export { AuthenticateUserUseCase }