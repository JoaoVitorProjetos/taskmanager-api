"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
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
mongoose_1.default.connect(process.env.DATABASE_URI || `mongodb+srv://root:${process.env.DATABASE_PASSWORD}@databse-joao.voiwao9.mongodb.net/?retryWrites=true&w=majority`);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use((0, cors_1.default)(options));
app.options('*', (0, cors_1.default)(options));
const port = process.env.PORT || 3003;
app.use(routes_1.default);
app.listen(port, () => { console.log(`Funcionando na porta ${port}`); });
//# sourceMappingURL=index.js.map