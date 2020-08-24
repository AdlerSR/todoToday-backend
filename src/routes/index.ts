import { Router } from 'express';
import todoRouter from './todos.routes';
import userRouter from './users.routes';
import sessionRouter from './sessions.routes';

const routes = Router();

routes.use('/todos', todoRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);

export default routes;
