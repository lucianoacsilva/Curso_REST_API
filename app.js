const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

require('dotenv').config();

const productRoutes = require('./api/routes/product');
const orderRoutes = require('./api/routes/order');

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/product', productRoutes);
app.use('/order', orderRoutes);

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