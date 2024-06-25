const cidadesModel = require('../models/cidadesModel');
const code = require('../models/connection/admin');

const getAll = async (_req, res) => {

    const cidades = await cidadesModel.getAll();

    return res.status(200).json(cidades);
};

const createCity = async(req, res) => {
    const {pass} = req.params;
    if (pass === code.senha) {
        const createdCity = await cidadesModel.createCity(req.body);
        return res.status(201).json(createdCity);
    } else {
        return res.status(404).json({message : "Você não tem permissão para isso"});
    }
}

module.exports = {
    getAll,
    createCity
};