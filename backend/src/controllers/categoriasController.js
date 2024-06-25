const categoriasModel = require('../models/categoriasModel');

const getAll = async (_req, res) => {

    const categorias = await categoriasModel.getAll();

    return res.status(200).json(categorias);
};

const createCat = async(req, res) => {
    const createdCat = await categoriasModel.createCat(req.body);
    return res.status(201).json(createdCat);
}

module.exports = {
    getAll,
    createCat
}