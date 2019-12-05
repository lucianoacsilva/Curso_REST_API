const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Pedidos retornados!!!"
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: "Pedido criado!!!"
    });
});

router.get('/:pedidoId', (req, res, next) => {
    res.status(200).json({
        message: "Detalhes do pedido!!!",
        orderId: req.params.pedidoId
    });
});

router.delete('/:pedidoId', (req, res, next) => {
    res.status(200).json({
        message: "Pedido excluido!!!",
        orderId: req.params.pedidoId
    });
});

module.exports = router;