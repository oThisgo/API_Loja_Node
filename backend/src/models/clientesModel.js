const connection = require('./connection/connection');

const createClient = async (cliente) => {
    const {nome, altura, nascimento, cidade} = cliente;

    try {
        
        const [rows] = await connection.execute('SELECT COUNT(*) AS count FROM clientes WHERE nome = ?', [nome]);
        const count = rows[0].count;
        if (count === 0){
            const [rows] = await connection.execute('SELECT id FROM cidades WHERE nome = ?', [cidade]);
            const idCidade = rows[0].id;
            const [createdClient] = await connection.execute('INSERT INTO clientes(nome, altura, nascimento, cidade_id) VALUES (?, ?, ?, ?)', [nome, altura, nascimento, idCidade]);
            return 'Cliente adicionado com sucesso! ID = ' + createdClient.insertId;
        }else{
            return 'Cliente já existe!';
        }

    }catch(error){
        console.error('Erro ao tentar cadastrar cliente:', error.message);
        throw error;
    }
}

module.exports = {
    createClient
};