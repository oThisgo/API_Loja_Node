const pedidosModel = require('../models/pedidosModel');

const getAll = async (req, res) => {
    const { id } = req.params;
  
    try {
      const pedidos = await pedidosModel.getAll(id);
  
      if (pedidos.length === 0) {
        return res.status(204).json({ message: 'Nenhum pedido encontrado para este cliente.' });
      }
  
      return res.status(200).json(pedidos);
    } catch (error) {
      console.error('Erro ao recuperar os pedidos:', error);
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

const createPed = async(req, res) => {
    const {id} = req.params;
    await pedidosModel.createPed(id, req.body);
    return res.status(204).json();
}

module.exports = {
    getAll,
    createPed
}