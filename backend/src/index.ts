import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001

app.use(cors());
app.use(express.json);

app.use('/api/auth', authRouter);

app.get('/', (req: Request, res: Response) => {
    res.send("Hello, World!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



