const validateBody = (req, res, next) => {
    const { body } = req;

    if(body.nome == undefined){
        return res.status(400).json({ message : 'Defina todos os campos corretamente!'})
    }

    if(body.nome == ""){
        return res.status(400).json({ message : 'Defina todos os campos corretamente!'})
    }

    next()
};

module.exports = {
    validateBody
};