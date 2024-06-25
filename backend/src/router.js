const express = require('express');
const router = express.Router();

//imports
const produtosController = require('./controllers/produtosController');
const produtosMiddleware = require('./middlewares/produtosMiddleware');
const clientesController = require('./controllers/clientesController');
const clientesMiddleware = require('./middlewares/clientesMiddleware');
const cidadesController = require('./controllers/cidadesController');
const cidadesMiddleware = require('./middlewares/cidadesMiddleware');
const categoriasController = require('./controllers/categoriasController');
const categoriasMiddleware = require('./middlewares/categoriasMiddleware');
const pedidosController = require('./controllers/pedidosController');
const pedidosMiddleware = require('./middlewares/pedidosMiddleware');

//rotas produtos
router.get('/produtos', produtosController.getAll);
router.post('/admin/add-produto/:pass', produtosMiddleware.validateBody, produtosController.createProd);
router.delete('/admin/del-produto/:id/:pass', produtosController.deleteProd);
router.put('/admin/upd-produto/:id/:pass', produtosMiddleware.validateBody, produtosController.updateProd);

//rotas clientes
router.post('/cadastrar', clientesMiddleware.validateBody, clientesController.createClient);

//rotas cidades
router.get('/cidades', cidadesController.getAll);
router.post('/admin/add-cidade/:pass', cidadesMiddleware.validateBody, cidadesController.createCity);

//rotas categorias
router.get('/categorias', categoriasController.getAll);
router.post('/admin/add-categoria/:pass', categoriasMiddleware.validateBody, categoriasController.createCat);

//rotas pedidos
router.get('/pedidos/:id', pedidosController.getAll);
router.post('/fazer-pedido/:id', pedidosMiddleware.validateBody, pedidosController.createPed);

module.exports = router;