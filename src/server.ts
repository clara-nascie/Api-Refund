import { app } from '@/app';

const PORT = 3000;

// Inicia o servidor 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});