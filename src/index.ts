import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import routes from './routes'

mongoose.connect(process.env.DATABASE_URI || 'mongodb+srv://root:Joaovitor123@databse-joao.voiwao9.mongodb.net/?retryWrites=true&w=majority')

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const port = process.env.PORT || 3003;

app.use(routes);
app.listen(port, () => {console.log(`Funcionando na porta ${port}`)})