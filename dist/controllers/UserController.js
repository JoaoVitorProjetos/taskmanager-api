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
const User_1 = __importDefault(require("../schemas/User"));
const Task_1 = __importDefault(require("../schemas/Task"));
class UserController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            const isEmailUnique = () => __awaiter(this, void 0, void 0, function* () {
                const array = yield User_1.default.find({ email: email });
                if (array.length === 0) {
                    return true;
                }
                else {
                    return false;
                }
            });
            try {
                isEmailUnique().then((result) => __awaiter(this, void 0, void 0, function* () {
                    if (result && email !== '' && password !== '') {
                        const user = yield User_1.default.create({
                            name,
                            email,
                            password,
                        });
                        return res.json({
                            message: 'registration alowed'
                        });
                    }
                    else {
                        return res.json({
                            error: "registration failed",
                            message: "this email is already in use"
                        });
                    }
                }));
            }
            catch (e) {
                return res.status(500).send({
                    error: "registration failed",
                    message: e,
                });
            }
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            try {
                res.json(yield User_1.default.find({ email: email }));
            }
            catch (e) {
                return res.status(500).send({
                    error: "find failed",
                    message: e,
                });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const userExists = () => __awaiter(this, void 0, void 0, function* () {
                const array = yield User_1.default.find({ email: email });
                if ((yield array.length) != 0) {
                    return true;
                }
                else {
                    return false;
                }
            });
            const authenticationPassword = () => __awaiter(this, void 0, void 0, function* () {
                const array = yield User_1.default.find({ email: email, password: password });
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
                        authenticationPassword().then((boolean) => __awaiter(this, void 0, void 0, function* () {
                            if (boolean) {
                                res.json({
                                    message: "login alowed"
                                });
                            }
                            else {
                                res.json({
                                    error: 'login failed',
                                    message: 'incorrect password'
                                });
                            }
                        }));
                    }
                    else {
                        res.json({
                            error: 'login failed',
                            message: "user not found"
                        });
                    }
                }));
            }
            catch (e) {
                return res.status(500).send({
                    error: "login failed",
                    message: e,
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, email, password, updateName, updateEmail, updatePass } = req.body;
            const userExists = () => __awaiter(this, void 0, void 0, function* () {
                const array = yield User_1.default.find({ email: email });
                if (array.length != 0) {
                    return true;
                }
                else {
                    return false;
                }
            });
            const authenticationPassword = () => __awaiter(this, void 0, void 0, function* () {
                const array = yield User_1.default.find({ email: email, password: password });
                if ((yield array.length) != 0) {
                    return true;
                }
                else {
                    return false;
                }
            });
            const isEmailUnique = () => __awaiter(this, void 0, void 0, function* () {
                const array = yield User_1.default.find({ _id: { $not: { $eq: `ObjectId(${id})` } }, email: updateEmail });
                if (array.length === 0) {
                    return true;
                }
                else {
                    return false;
                }
            });
            try {
                userExists().then((boolean) => __awaiter(this, void 0, void 0, function* () {
                    if (boolean) {
                        authenticationPassword().then((boolean) => __awaiter(this, void 0, void 0, function* () {
                            if (boolean) {
                                isEmailUnique().then((boolean) => __awaiter(this, void 0, void 0, function* () {
                                    if (boolean) {
                                        yield User_1.default.updateOne({ email: email }, {
                                            $set: { name: updateName, email: updateEmail, password: updatePass }
                                        });
                                        res.json(yield User_1.default.find({ email: updateEmail }));
                                    }
                                    else {
                                        res.json({
                                            error: 'update failed',
                                            message: 'email already in use'
                                        });
                                    }
                                }));
                            }
                            else {
                                res.json({
                                    error: 'update failed',
                                    message: 'incorrect password'
                                });
                            }
                        }));
                    }
                    else {
                        res.json({
                            error: 'update failed',
                            message: "user not found"
                        });
                    }
                }));
            }
            catch (e) {
                return res.status(500).send({
                    error: "update failed",
                    message: e,
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, deleteMessage } = req.body;
            const userExists = () => __awaiter(this, void 0, void 0, function* () {
                const array = yield User_1.default.find({ email: email });
                if (array.length != 0) {
                    return true;
                }
                else {
                    return false;
                }
            });
            const authenticationPassword = () => __awaiter(this, void 0, void 0, function* () {
                const array = yield User_1.default.find({ email: email, password: password });
                if ((yield array.length) != 0) {
                    return true;
                }
                else {
                    return false;
                }
            });
            const authenticationDeleteMessage = () => __awaiter(this, void 0, void 0, function* () {
                if (deleteMessage === `delete ${email}`) {
                    return true;
                }
                else {
                    return false;
                }
            });
            try {
                userExists().then((boolean) => __awaiter(this, void 0, void 0, function* () {
                    if (boolean) {
                        authenticationPassword().then((boolean) => __awaiter(this, void 0, void 0, function* () {
                            if (boolean) {
                                authenticationDeleteMessage().then((boolean) => __awaiter(this, void 0, void 0, function* () {
                                    if (boolean) {
                                        yield User_1.default.deleteOne({ email: email });
                                        yield Task_1.default.deleteMany({ emailUser: email });
                                        res.json({
                                            message: 'User deleted'
                                        });
                                    }
                                    else {
                                        res.json({
                                            error: 'delete failed',
                                            message: 'delete message incorrect'
                                        });
                                    }
                                }));
                            }
                            else {
                                res.json({
                                    error: 'delete failed',
                                    message: 'incorrect password'
                                });
                            }
                        }));
                    }
                    else {
                        res.json({
                            error: 'delete failed',
                            message: "user not found"
                        });
                    }
                }));
            }
            catch (e) {
                return res.status(500).send({
                    error: "delete failed",
                    message: e,
                });
            }
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map