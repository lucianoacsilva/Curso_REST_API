const express = require('express');
const router = express.Router();

const password = process.env.MONGODB_PASSWORD

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://usuario:" + password + "@cluster0-atshr.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

var collection
client.connect(err => {
    collection = client.db("test").collection("devices");
  // perform actions on the collection object
//   collection.insertOne({nome: "Joao"});
//   client.close();
});


router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Trabalhando com GET requests para /products!!!'
    });
});

// router.post('/', (req, res, next) => {
//     res.status(201).json({
//         message: 'Trabalhando com POST requests para /products!!!'
//     });
// });

/* router.get('/:idProduto', (req, res, next) => {
    const id = req.params.idProduto;

    if (id === 'especial') {
        res.status(200).json({
            message: "Descobriu o ID especial",
            id: id
        });
    }

    else {
        res.status(200).json({
            message: "Voce passou um ID!!"
        });
    }
}); */

router.patch('/:idProduto', (req, res, next) => {
    res.status(200).json({
        message: "Produto atualizado!!"
    });
});

// router.delete('/:idProduto', (req, res, next) => {
//     res.status(200).json({
//         message: "Produto deletado!!"
//     });
// });

//Desafio!!!

router.get('/:nomeProduto', (req, res, next) => {
    const nome = req.params.nomeProduto;

    for (p in bancoMock) {
        if (bancoMock[p]["nome"] === nome) {
            res.status(200).json(bancoMock[p]);
        }
    }

    res.status(500).json({
        message: "O registro nao existe na base!"
    });
});

router.post('/', (req, res, next) => {
    collection.insertOne(req.body, (error, response)=>{

        if(error) {
            res.status(500).json({
                message: error
            });
        }

        else {
            res.status(201).json({
                message: response
            });
        }

    });

    
    
});

router.patch('/:idProduto', (req, res, next) => {
    res.status(200).json({
        message: "Produto atualizado!!"
    });
});

router.delete('/:nomeProduto', (req, res, next) => {
    const nome = req.params.nomeProduto;

    for (p in bancoMock) {
        if (bancoMock[p]["nome"] === nome) {
            bancoMock.splice(p, 1);
            res.status(200).json({
                message: "Produto deletado!!",
                produtos: bancoMock
            });
        }
    }

    res.status(500).json({
        message: "O registro nao existe na base!"
    });
});

module.exports = router;