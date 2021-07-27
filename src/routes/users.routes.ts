import { Router} from "express";
import {CreateUserController} from "../modules/accounts/useCases/createUser/CreateUserController";
import {UpdateUserAvatarController} from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import {ensureAuthenticate} from "../middlewares/ensureAuthenticate";
import multer from "multer";

const userRoutes = Router();
const upload = multer({
    dest: './tmp'
});

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

userRoutes.post("/", createUserController.handle);

userRoutes.patch("/avatar", ensureAuthenticate, upload.single("file"), updateUserAvatarController.handle);

export { userRoutes }