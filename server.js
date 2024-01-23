console.log("Hello World!?");
const express = require('express');
const mongoose  = require('mongoose');
const app =express()

//ROUTES
app.get('/', (req, res) => {
    res.send('Hello Node API')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is Ted!');
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


