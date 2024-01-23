console.log("Hello World!?");
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel');
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//ROUTES
app.get('/', (req, res) => {
    res.send('Hello Node API')
})

app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const products = await Product.findById(id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// update a product
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if(!product){
            return res.status(404).json({message: 'cannot finda ny product'})
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// delete a product
app.delete('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(400).json({message: 'cannot find any product with that id'});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is Ted!');
})

app.post('/product', async(req, res) => {
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch( error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    };
})

mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://tpascua11:restdragon@dragon-cluster3.k0qncbt.mongodb.net/Teds-Node-API?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB!')
    app.listen(3000, ()=>{
        console.log('Node API is running of port 3000!');
    })
}).catch(()=> {
    console.log(error)
})
