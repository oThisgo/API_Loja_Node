const validateBody = (req, res, next) => {
    const { body } = req;

    if(body.nome == undefined || body.preco == undefined || body.quantidade == undefined || body.categoria == undefined){
        return res.status(400).json({ message : 'Defina todos os campos corretamente!'})
    }

    if(body.nome == "" || body.preco == "" || body.quantidade == "" || body.categoria == ""){
        return res.status(400).json({ message : 'Defina todos os campos corretamente!'})
    }

    next()
};

module.exports = {
    validateBody
};
