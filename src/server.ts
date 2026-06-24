import { app } from '@/app';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3333;

// Inicia o servidor 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});