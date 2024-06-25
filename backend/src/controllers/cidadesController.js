const cidadesModel = require('../models/cidadesModel');

const getAll = async (_req, res) => {

    const cidades = await cidadesModel.getAll();

    return res.status(200).json(cidades);
};

const createCity = async(req, res) => {
    const createdCity = await cidadesModel.createCity(req.body);
    return res.status(201).json(createdCity);
}

module.exports = {
    getAll,
    createCity
};