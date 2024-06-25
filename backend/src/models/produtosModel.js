const connection = require('./connection/connection');

const getAll = async () => {
    const [produtos] = await connection.execute('SELECT p.id, p.nome, p.preco, p.quantidade, c.nome AS categoria FROM produtos p INNER JOIN categorias c ON p.categoria_id = c.id');
    return produtos;
};

const createProd = async (produto) => {

    const {nome, preco, quantidade, categoria} = produto;
    const [productRows] = await connection.execute('SELECT COUNT(*) as count FROM produtos WHERE nome = ?', [nome]);
    const productExists = productRows[0].count > 0;

    if (productExists) {
        return 'O produto já existe!'
    }else{
        const [categoryRows] = await connection.execute('SELECT COUNT(*) as count FROM categorias WHERE id = ?', [categoria]);
        const categoryExists = categoryRows[0].count > 0;
        if (!categoryExists) {
            return 'ID de categoria inexistente!';
        }else{
            const [createdProd] = await connection.execute('INSERT INTO produtos(nome, preco, quantidade, categoria_id) VALUES (?, ?, ?, ?)', [nome, preco, quantidade, categoria]);
            return 'Produto adicionado com sucesso! ID = ' + createdProd.insertId;
        }
    }
}

const deleteProd = async (id) => {
    const [productRows] = await connection.execute('SELECT COUNT(*) as count FROM produtos WHERE id = ?', [id]);
    const productExists = productRows[0].count > 0;

    if (!productExists) {
        return 'O produto não existe!';
    }else{
        const deletedProd = await connection.execute('DELETE FROM produtos WHERE id = ?', [id]);
        return 'Produto ' + deletedProd.insertId + 'deletado com sucesso!';
    }
}

const updateProd = async(id, produto) => {
    const {nome, preco, quantidade, categoria} = produto;
    const [updatedProd] = await connection.execute('UPDATE produtos SET nome = ?, preco = ?, quantidade = ?, categoria_id = ? WHERE id = ?', [nome, preco, quantidade, categoria, id]);
    return updatedProd;
}

module.exports = {
    getAll,
    createProd,
    deleteProd,
    updateProd
};