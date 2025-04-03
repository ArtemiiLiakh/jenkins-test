import express from 'express';
import {userRouter} from './routes/userRouter';
import {postRouter} from './routes/postRouter';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const api = express.Router();

api.use('/users', userRouter);
api.use('/posts', postRouter);

app.use('/api', api);

export { app };