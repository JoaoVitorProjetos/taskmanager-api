"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("./controllers/UserController"));
const TaskController_1 = __importDefault(require("./controllers/TaskController"));
const routes = (0, express_1.Router)();
//ROUTES USER
routes.post('/signin', UserController_1.default.create);
routes.post('/findUser', UserController_1.default.find);
routes.post('/login', UserController_1.default.login);
routes.post('/updateUser', UserController_1.default.update);
routes.post('/deleteUser', UserController_1.default.delete);
//ROUTES TASK
routes.post('/createTask', TaskController_1.default.create);
routes.post('/findTasks', TaskController_1.default.find);
routes.post('/updateTask', TaskController_1.default.update);
routes.post('/deleteTask', TaskController_1.default.delete);
exports.default = routes;
//# sourceMappingURL=routes.js.map