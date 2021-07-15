// @ts-ignore
import express, {request, response} from 'express';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(router);

app.get('/', (request, response) => {
    return response.json({message: 'Hello World'});
})

app.listen(3000, () => console.log("Server is running!"));