import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import { errorHandling } from './middlewares/error-handling';
import { AppError } from './utils/AppError';

// Inicializa o express 
const app = express();

// Configura o cors
app.use(cors());

// Configura o express para usar json 
app.use(express.json());

// Adiciona o middleware de tratamento de erros
app.use(errorHandling);

// Exporta o express 
export { app };