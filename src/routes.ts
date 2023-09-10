import { Router } from 'express';
import UserController from './controllers/UserController';

const routes = Router();

routes.post('/createUser', UserController.create);

export default routes;