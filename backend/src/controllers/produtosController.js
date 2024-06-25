const produtosModel = require('../models/produtosModel');

const getAll = async (_req, res) => {

    const produtos = await produtosModel.getAll();

    return res.status(200).json(produtos);
};

const createProd = async(req, res) => {
    const createdProd = await produtosModel.createProd(req.body);
    return res.status(201).json(createdProd);
}

const deleteProd = async(req, res) => {
    const {id} = req.params;

    await produtosModel.deleteProd(id);

    return res.status(204).json();
};

const updateProd = async(req, res) => {
    const {id} = req.params;
    await produtosModel.updateProd(id, req.body);
    return res.status(204).json();
}

module.exports = {
    getAll,
    createProd, 
    deleteProd,
    updateProd
};