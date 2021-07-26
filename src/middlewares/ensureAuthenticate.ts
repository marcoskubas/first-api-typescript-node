import {NextFunction, Request, Response} from "express";
import {verify} from "jsonwebtoken";
import {UsersRepository} from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload{
    sub: string;
}

export async function ensureAuthenticate(request: Request, response: Response, next: NextFunction){
    const authHeader = request.headers.authorization;
    if(!authHeader){
        throw new Error("Token missing!");
    }

    //Bearer token
    const [, token] =  authHeader.split(" ");
    try {
        const { sub: user_id } = verify(token, "47f995461d41e63aa7162936740b003a") as IPayload;
        console.log("id user: " + user_id);
        const usersRepository = new UsersRepository();
        const user = usersRepository.findById(user_id);
        if(!user){
            throw new Error("User does not exists!");
        }
    }catch (e){
        throw new Error("Invalid token!");
    }

    next();

}