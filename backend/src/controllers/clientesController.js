const clientesModel = require('../models/clientesModel');

const createClient = async(req, res) => {
    const createdClient = await clientesModel.createClient(req.body);
    return res.status(201).json(createdClient);
}

module.exports = {
    createClient
};