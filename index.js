const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');

const products_controller = require('./products_controller')
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/api/product/:id', products_controller.getOne)
app.get('/api/products', products_controller.getAll)
app.post('/api/product', products_controller.create)
app.put('/api/product/:id', products_controller.update)
app.delete('/api/product/:id', products_controller.delete)

massive( process.env.CONNECTION_STRING ).then( db => {
    
    app.set('db', db)
    
    const port = process.env.PORT || 3000;
    app.listen(port, () => {console.log(`Server Listening on Port ${port}`);});

});


