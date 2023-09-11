"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Task_1 = __importDefault(require("../schemas/Task"));
const User_1 = __importDefault(require("../schemas/User"));
class TaskController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, task } = req.body;
            const userExists = () => __awaiter(this, void 0, void 0, function* () {
                const array = yield User_1.default.find({ email: email });
                if ((yield array.length) != 0) {
                    return true;
                }
                else {
                    return false;
                }
            });
            const taskExists = () => __awaiter(this, void 0, void 0, function* () {
                const array = yield Task_1.default.find({ task: task, emailUser: email });
                if ((yield array.length) != 0) {
                    return true;
                }
                else {
                    return false;
                }
            });
            try {
                userExists().then((boolean) => __awaiter(this, void 0, void 0, function* () {
                    if (boolean) {
                        taskExists().then((boolean) => __awaiter(this, void 0, void 0, function* () {
                            if (!boolean) {
                                const taskCreated = yield Task_1.default.create({
                                    task: task,
                                    emailUser: email
                                });
                                return res.json({
                                    message: 'task created'
                                });
                            }
                            else {
                                return res.json({
                                    message: 'create task filed',
                                    error: 'task already exists'
                                });
                            }
                        }));
                    }
                    else {
                        return res.json({
                            message: 'create task failed',
                            error: 'user not found'
                        });
                    }
                }));
            }
            catch (e) {
                return res.json({
                    message: 'create task filed',
                    error: e
                });
            }
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const userExists = () => __awaiter(this, void 0, void 0, function* () {
                const array = yield User_1.default.find({ email: email });
                if ((yield array.length) != 0) {
                    return true;
                }
                else {
                    return false;
                }
            });
            try {
                userExists().then((boolean) => __awaiter(this, void 0, void 0, function* () {
                    if (boolean) {
                        const tasks = yield Task_1.default.find({
                            emailUser: email
                        });
                        return res.json(tasks);
                    }
                    else {
                        return res.json({
                            message: 'find task failed',
                            error: 'user not found'
                        });
                    }
                }));
            }
            catch (e) {
                return res.json({
                    message: 'find tasks filed',
                    error: e
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, task, updateTask } = req.body;
            const userExists = () => __awaiter(this, void 0, void 0, function* () {
                const array = yield User_1.default.find({ email: email });
                if ((yield array.length) != 0) {
                    return true;
                }
                else {
                    return false;
                }
            });
            const taskExists = () => __awaiter(this, void 0, void 0, function* () {
                const array = yield Task_1.default.find({ task: task, emailUser: email });
                if ((yield array.length) != 0) {
                    return true;
                }
                else {
                    return false;
                }
            });
            const taskUpdatedExists = () => __awaiter(this, void 0, void 0, function* () {
                const array = yield Task_1.default.find({ task: updateTask, emailUser: email });
                if ((yield array.length) != 0) {
                    return true;
                }
                else {
                    return false;
                }
            });
            try {
                userExists().then((boolean) => __awaiter(this, void 0, void 0, function* () {
                    if (boolean) {
                        taskExists().then((boolean) => __awaiter(this, void 0, void 0, function* () {
                            if (boolean) {
                                taskUpdatedExists().then((boolean) => __awaiter(this, void 0, void 0, function* () {
                                    if (!boolean) {
                                        yield Task_1.default.updateOne({ emailUser: email, task: task }, {
                                            $set: { task: updateTask, emailUser: email }
                                        });
                                        res.json({
                                            message: 'task updated'
                                        });
                                    }
                                    else {
                                        res.json({
                                            message: 'update task filed',
                                            error: 'updateTask already exists'
                                        });
                                    }
                                }));
                            }
                            else {
                                res.json({
                                    message: 'update task failed',
                                    error: 'task not found'
                                });
                            }
                        }));
                    }
                    else {
                        res.json({
                            message: 'update task failed',
                            error: 'user not found'
                        });
                    }
                }));
            }
            catch (e) {
                res.json({
                    message: 'update task failed',
                    error: e
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, task } = req.body;
            const userExists = () => __awaiter(this, void 0, void 0, function* () {
                const array = yield User_1.default.find({ email: email });
                if ((yield array.length) != 0) {
                    return true;
                }
                else {
                    return false;
                }
            });
            const taskExists = () => __awaiter(this, void 0, void 0, function* () {
                const array = yield Task_1.default.find({ task: task, emailUser: email });
                if ((yield array.length) != 0) {
                    return true;
                }
                else {
                    return false;
                }
            });
            try {
                userExists().then((boolean) => __awaiter(this, void 0, void 0, function* () {
                    if (boolean) {
                        taskExists().then((boolean) => __awaiter(this, void 0, void 0, function* () {
                            if (boolean) {
                                yield Task_1.default.deleteOne({
                                    task: task,
                                    emailUser: email
                                });
                                return res.json({
                                    message: 'task deleted'
                                });
                            }
                            else {
                                return res.json({
                                    message: 'delete task filed',
                                    error: 'task not found'
                                });
                            }
                        }));
                    }
                    else {
                        return res.json({
                            message: 'delete task failed',
                            error: 'user not found'
                        });
                    }
                }));
            }
            catch (e) {
                return res.json({
                    message: 'delete task filed',
                    error: e
                });
            }
        });
    }
}
exports.default = new TaskController();
//# sourceMappingURL=TaskController.js.map