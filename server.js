console.log("Hello World!?");
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel');
const app =express()

app.use(express.json());

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
