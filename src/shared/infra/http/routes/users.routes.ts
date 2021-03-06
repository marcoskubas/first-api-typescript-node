import { Router} from "express";
import multer from "multer";
import uploadConfig from "@config/upload";

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

import {CreateUserController} from "@modules/accounts/useCases/createUser/CreateUserController";
import {UpdateUserAvatarController} from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import {ensureAuthenticate} from "@shared/infra/http/middlewares/ensureAuthenticate";

const userRoutes = Router();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

userRoutes.post("/", createUserController.handle);

userRoutes.patch("/avatar", ensureAuthenticate, uploadAvatar.single("avatar"), updateUserAvatarController.handle);

export { userRoutes }