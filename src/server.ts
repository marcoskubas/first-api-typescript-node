// @ts-ignore
import express, {request, response} from 'express';
import swaggerUI from 'swagger-ui-express';
import "./database";
import { router } from './routes';
import swaggerFile from './swagger.json';

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(router);

app.get('/', (request, response) => {
    return response.json({message: 'Hello World'});
})

app.listen(3000, () => console.log("Server is running!"));