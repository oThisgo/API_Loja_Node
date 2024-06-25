const connection = require('./connection/connection');

const getAll = async () => {
    const [cidades] = await connection.execute('SELECT * FROM cidades');
    return cidades;
};

const createCity = async (cidade) => {

    const {nome} = cidade;
    try {
        const [rows] = await connection.execute('SELECT COUNT(*) AS count FROM cidades WHERE nome = ?', [nome]);
        const count = rows[0].count;

        if (count === 0) {
            const [createdCity] = await connection.execute('INSERT INTO cidades(nome) VALUES (?)', [nome]);
            return `Cidade adicionada com sucesso! ID = ${createdCity.insertId}`;
        } else {
            return 'Cidade já existe!';
        }
    } catch (error) {
        console.error('Erro ao tentar criar cidade:', error.message);
        throw error;
    }
}

module.exports = {
    getAll,
    createCity
};