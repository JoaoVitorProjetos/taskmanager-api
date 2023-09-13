import { Router } from 'express';
import UserController from './controllers/UserController';
import TaskController from './controllers/TaskController';

const routes = Router();

//ROUTES USER

routes.post('/signin', UserController.create);
routes.post('/findUser', UserController.find);
routes.post('/login', UserController.login);
routes.post('/updateUser', UserController.update);
routes.post('/deleteUser', UserController.delete);

//ROUTES TASK

routes.post('/createTask', TaskController.create);
routes.post('/findTasks', TaskController.find);
routes.post('/updateTask', TaskController.update);
routes.post('/deleteTask', TaskController.delete);

export default routes;