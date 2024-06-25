const validateBody = (req, res, next) => {
    const { body } = req;

    if(body.nome == undefined || body.altura == undefined || body.nascimento == undefined || body.cidade == undefined){
        return res.status(400).json({ message : 'Defina todos os campos corretamente!'})
    }

    if(body.nome == "" || body.altura == "" || body.nascimento == "" || body.cidade == ""){
        return res.status(400).json({ message : 'Defina todos os campos corretamente!'})
    }

    next()
};

module.exports = {
    validateBody
};