import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import routes from './routes'

mongoose.connect(process.env.DATABASE_URI || 'mongodb+srv://root:Joaovitor123@databse-joao.voiwao9.mongodb.net/?retryWrites=true&w=majority')

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

const port = process.env.PORT;

app.use(routes);
app.listen(port, () => {console.log(`Funcionando na porta ${port}`)})