import "express-async-errors";
import express from 'express';
import cors from 'cors';

import { routes } from "./routes";
import { errorHandling } from './middlewares/error-handling';

// Inicializa o express 
const app = express();

// Configura o cors
app.use(cors());

// Configura o express para usar json 
app.use(express.json());

// Adiciona as rotas públicas 
app.use(routes);

// Adiciona o middleware de tratamento de erros
app.use(errorHandling);

// Exporta o express 
export { app };