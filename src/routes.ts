import { Router } from 'express';
import UserController from './controllers/UserController';

const routes = Router();

routes.post('/createUser', UserController.create);
routes.get('/allusers', UserController.readAll);
routes.post('/login', UserController.login);
routes.post('/update', UserController.update);
routes.post('/delete', UserController.delete);

export default routes;