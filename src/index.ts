import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors';
require('dotenv').config();

const options: cors.CorsOptions = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: 'https://taskmanagerjoao.vercel.app/',
    preflightContinue: false,
  };

import routes from './routes'

mongoose.connect(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST1}=${process.env.DATABASE_HOST2}=${process.env.DATABASE_HOST3}`)

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors(options));
app.options('*', cors(options));


const port = process.env.PORT;

app.use(routes);
app.listen(port, () => {console.log(`Funcionando na porta ${port}`)})