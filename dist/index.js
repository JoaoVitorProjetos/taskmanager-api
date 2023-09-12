"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
mongoose_1.default.connect(process.env.DATABASE_URI || 'mongodb+srv://root:Joaovitor123@databse-joao.voiwao9.mongodb.net/?retryWrites=true&w=majority');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use((req, res, next) => {
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    //Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use((0, cors_1.default)());
    next();
});
const port = process.env.PORT;
app.use(routes_1.default);
app.listen(port, () => { console.log(`Funcionando na porta ${port}`); });
//# sourceMappingURL=index.js.map