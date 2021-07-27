import {NextFunction, Request, Response} from "express";
import {verify} from "jsonwebtoken";
import {UsersRepository} from "../modules/accounts/repositories/implementations/UsersRepository";
import {AppError} from "../errors/AppError";

interface IPayload{
    sub: string;
}

export async function ensureAuthenticate(request: Request, response: Response, next: NextFunction){
    const authHeader = request.headers.authorization;
    if(!authHeader){
        throw new AppError("Token missing!", 401);
    }

    //Bearer token
    const [, token] =  authHeader.split(" ");
    try {
        const { sub: user_id } = verify(token, "47f995461d41e63aa7162936740b003a") as IPayload;
        console.log("id user: " + user_id);
        const usersRepository = new UsersRepository();
        const user = usersRepository.findById(user_id);
        if(!user){
            throw new AppError("User does not exists!", 404);
        }
    }catch (e){
        throw new AppError("Invalid token!", 401);
    }

    request.user = {
        // @ts-ignore
        id: user_id
    };

    next();

}