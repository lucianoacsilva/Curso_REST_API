const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv').config();

const productRoutes = require('./api/routes/product');
const orderRoutes = require('./api/routes/order');

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/product', productRoutes);
app.use('/order', orderRoutes);

app.use((req, res, next) => {
    //Permitir qualquer origem
    res.header("Access-Control-Allow-Origin", "*");

    //Permitir qualquer cabeçalho
    res.header("Acces-Control-Allow-Headers",
        "Origin, X-Requested-With, ContentType, Accept, Authorization");

    //Exibe as opções de requisição possíveis
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allowed-Methods", "GET, PUT, POST, PATCH, DELETE");
        res.status(200).json({});
    }
});

app.use((req, res, next) => {
    const erro = new Error("Pagina nao encontrada");
    erro.status = 404;
    next(erro);
});

app.use((erro, req, res, next) => {
    res.status(erro.status || 500);
    res.json({
        error: erro.message
    });
});
 

module.exports = app;