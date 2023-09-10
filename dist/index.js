"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
mongoose_1.default.connect(process.env.DATABASE_URI || 'mongodb+srv://root:Joaovitor123@databse-joao.voiwao9.mongodb.net/?retryWrites=true&w=majority');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
const port = process.env.PORT || 3003;
app.use(routes_1.default);
app.listen(port, () => { console.log(`Funcionando na porta ${port}`); });
//# sourceMappingURL=index.js.map