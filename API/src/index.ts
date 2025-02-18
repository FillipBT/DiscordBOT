import express, {Express} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import v1Routes from './v1/routes/routes';
import { connectDB } from './functions/ConnectDB';

dotenv.config();

const app: Express = express();

const port: string = process.env.PORT as string || '3000';

app.use(cors());

app.use(express.json())

app.use('/api/v1', v1Routes)

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch((error) => console.log(error))


