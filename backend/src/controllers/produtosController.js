const produtosModel = require('../models/produtosModel');
const code = require('../models/connection/admin');
const { json } = require('express');

const getAll = async (_req, res) => {

    const produtos = await produtosModel.getAll();

    return res.status(200).json(produtos);
};

const createProd = async(req, res) => {
    const {pass} = req.params;
    if (pass === code.senha) {
        const createdProd = await produtosModel.createProd(req.body);
        return res.status(201).json(createdProd);
    } else {
        return res.status(404).json({message : "Você não tem permissão para isso"});
    }
}

const deleteProd = async(req, res) => {
    const {id} = req.params;
    const {pass} = req.params;
    if (pass === code.senha) {
        await produtosModel.deleteProd(id);
        return res.status(204).json();
    } else {
        return res.status(404).json({message : "Você não tem permissão para isso"});
    }
};

const updateProd = async(req, res) => {
    const {id} = req.params;
    const {pass} = req.params;
    if (pass === code.senha) {
        await produtosModel.updateProd(id, req.body);
        return res.status(204).json();
    } else {
        return res.status(404).json({message : "Você não tem permissão para isso"});
    }
}

module.exports = {
    getAll,
    createProd, 
    deleteProd,
    updateProd
};