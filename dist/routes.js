"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("./controllers/UserController"));
const routes = (0, express_1.Router)();
routes.post('/createUser', UserController_1.default.create);
routes.get('/allusers', UserController_1.default.readAll);
routes.post('/login', UserController_1.default.login);
routes.post('/update', UserController_1.default.update);
routes.post('/delete', UserController_1.default.delete);
exports.default = routes;
//# sourceMappingURL=routes.js.map