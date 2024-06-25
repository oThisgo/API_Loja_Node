const app = require('./app')
require('dotenv').config();

const PORT = process.env.PORT || 8001;

if (!PORT) {
    throw new Error('Porta não definida');
} else {
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}