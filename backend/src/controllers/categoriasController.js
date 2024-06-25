const categoriasModel = require('../models/categoriasModel');
const code = require('../models/connection/admin');

const getAll = async (_req, res) => {

    const categorias = await categoriasModel.getAll();

    return res.status(200).json(categorias);
};

const createCat = async(req, res) => {
    const {pass} = req.params;
    if (pass === code.senha) {
        const createdCat = await categoriasModel.createCat(req.body);
        return res.status(201).json(createdCat);
    } else {
        return res.status(404).json({message : "Você não tem permissão para isso"});
    }
    
}

module.exports = {
    getAll,
    createCat
}