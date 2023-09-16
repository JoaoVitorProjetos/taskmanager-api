"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
require('dotenv').config();
const options = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: 'https://taskmanagerjoao.vercel.app',
    preflightContinue: false,
};
const routes_1 = __importDefault(require("./routes"));
mongoose_1.default.connect(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST1}=${process.env.DATABASE_HOST2}=${process.env.DATABASE_HOST3}`);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use((0, cors_1.default)(options));
app.options('*', (0, cors_1.default)(options));
const port = process.env.PORT;
app.use(routes_1.default);
app.listen(port, () => { console.log(`Funcionando na porta ${port}`); });
//# sourceMappingURL=index.js.map