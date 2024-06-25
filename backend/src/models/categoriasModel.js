const connection = require('./connection/connection');

const getAll = async () => {
    const [categorias] = await connection.execute('SELECT nome FROM categorias');
    return categorias;
};

const createCat = async (categoria) => {
    const {nome} = categoria;
    try {
        const [rows] = await connection.execute('SELECT COUNT(*) AS count FROM categorias WHERE nome = ?', [nome]);
        const count = rows[0].count;

        if (count === 0) {
            const [createdCat] = await connection.execute('INSERT INTO categorias(nome) VALUES (?)', [nome]);
            return `Categoria adicionada com sucesso! ID = ${createdCat.insertId}`;
        } else {
            return 'Categoria já existe!';
        }
    } catch (error) {
        console.error('Erro ao tentar criar categoria:', error.message);
        throw error;
    }
}

module.exports = {
    getAll,
    createCat
};