const validateBody = (req, res, next) => {
    const { body } = req;

    if(body.produto == undefined || body.quantidade == undefined || body.endereco == undefined){
        return res.status(400).json({ message : 'Defina todos os campos corretamente!'})
    }

    if(body.produto == "" || body.quantidade == "" || body.endereco == ""){
        return res.status(400).json({ message : 'Defina todos os campos corretamente!'})
    }

    next()
};

module.exports = {
    validateBody
};