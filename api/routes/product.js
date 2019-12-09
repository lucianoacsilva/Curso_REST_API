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


// router.get('/', (req, res, next) => {
//     res.status(200).json({
//         message: 'Trabalhando com GET requests para /products!!!'
//     });
// });

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

// router.patch('/:idProduto', (req, res, next) => {
//     res.status(200).json({
//         message: "Produto atualizado!!"
//     });
// });

// router.delete('/:idProduto', (req, res, next) => {
//     res.status(200).json({
//         message: "Produto deletado!!"
//     });
// });

//-----------------------------------------------------------------

//Desafio!!!

router.get('/', (req, res, next) => {

    collection.find({}).toArray((error, response) => {
        if(error) {
            res.status(500).json({
                message: error
            });
        }

        else {
            res.status(200).json({
                message: response
            });
        }
    });

});

router.get('/:nomeProduto', (req, res, next) => {
    const nomezinho = req.params.nomeProduto;

    var query = { "nome": nomezinho };

    console.log(query);

    collection.find(query).toArray((error, response) => {
        if(error) {
            res.status(500).json({
                message: error
            });
        }

        else {
            res.status(200).json({
                message: response
            });
        }
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

router.patch('/:nomeProduto', (req, res, next) => {
    const nomezinho = req.params.nomeProduto;
    const precoNovo = req.body.preco;


    var query = { "nome": nomezinho };
    var novoValor = { $set: { "preco": precoNovo } };

    console.log(query);
    console.log(req.body);

    collection.updateMany(query, novoValor, (error, response) => {
        if(error) {
            res.status(500).json({
                message: error
            });
        }

        else {
            res.status(200).json({
                message: response
            });
        }
    });
});

router.delete('/:nomeProduto', (req, res, next) => {

    const nomezinho = req.params.nomeProduto;

    var query = { "nome": nomezinho };

    console.log(query);

    collection.deleteMany(query, (error, response) => {
        if(error) {
            res.status(500).json({
                message: error
            });
        }

        else {
            res.status(200).json({
                message: response
            });
        }
    });

});

module.exports = router;