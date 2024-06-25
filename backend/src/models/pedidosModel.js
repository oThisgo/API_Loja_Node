const connection = require('./connection/connection');

const createPed = async (id, pedido) => {
    const { produto, quantidade, endereco } = pedido;
  
    try {
  
      const [createdPed] = await connection.execute('INSERT INTO pedidos(horario, endereco, cliente_id) VALUES (NOW(), ?, ?)', [endereco, id]);
  
      const pedidoId = createdPed.insertId;
  
      const [prodIdRows] = await connection.execute('SELECT id, preco, quantidade FROM produtos WHERE nome = ?', [produto]);
  
      if (prodIdRows.length === 0) {
        return 'Produto não encontrado';
      }
  
      const { id: produtoId, preco: produtoPreco, quantidade: produtoQuantidade } = prodIdRows[0];
  
      const precoTotal = produtoPreco * quantidade;
      const quantidadeTotal = produtoQuantidade - quantidade;
      await connection.execute('UPDATE produtos SET quantidade = ? WHERE id = ?', [quantidadeTotal, produtoId]);
      await connection.execute('INSERT INTO pedidos_produtos(pedido_id, produto_id, preco, quantidade) VALUES (?, ?, ?, ?)', [pedidoId, produtoId, precoTotal, quantidade]);
  
      return 'Pedido feito com sucesso!';

    } catch (error) {

      console.error('Erro ao processar o pedido:', error);
      throw error;
    }
}

const getAll = async (id) => {
  
    try {

      const [pedidos] = await connection.execute(`SELECT pr.nome, pp.preco, pp.quantidade, pe.horario, pe.endereco FROM pedidos_produtos pp INNER JOIN produtos pr ON pp.produto_id = pr.id INNER JOIN pedidos pe ON pp.pedido_id = pe.id WHERE pe.cliente_id = ?`, [id]);
  
      return pedidos;

    } catch (error) {

      console.error('Erro ao acessar o banco de dados:', error);
      throw error;

    }
};

module.exports = {
    createPed,
    getAll
}