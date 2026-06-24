import express from 'express';
import cors from 'cors';

// Inicializa o express 
const app = express();

// Configura o cors
app.use(cors());

// Configura o express para usar json 
app.use(express.json());

// Rota padrão (Health Check)
app.get('/', (req, res) => {
    res.json({ 
        status: "online",
        message: "API de Reembolso funcionando com sucesso!" 
    });
});

// Exporta o express 
export { app };