// @ts-ignore
import express, {NextFunction, request, Response, response} from 'express';
import "express-async-errors";
import swaggerUI from 'swagger-ui-express';

import "./database";
import "@shared/container";
import { router } from './routes';
import swaggerFile from './swagger.json';
import {AppError} from "@errors/AppError";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(router);

// @ts-ignore
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof AppError){
        return response.status(err.statusCode).json({message: err.message});
    }
    return response.status(500).json({status: "error", message: `Internal Server Error - ${err.message}`});
});

app.get('/', (request, response) => {
    return response.json({message: 'Hello World'});
})

app.listen(3000, () => console.log("Server is running!"));