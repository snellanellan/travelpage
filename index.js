//how to require the express
const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
let db;
const com = 'comments';
//to get my css running:
app.use(express.static(__dirname))

app.use(bodyParser.urlencoded({extended: true}))

//to create a server where browsers can connect to, use the listen method provided by express
app.listen(3000, function() {
    console.log('listening on 3000')
})

//to answer the get request from the browser we use the get method  
app.get('/', (req, res) => {
    res.sendFile(__dirname+ '/index.html')
})

app.post('/comments', (req, res) => {
    db.collection(com).save(req.body, (err, result) => {
        if (err) return console.log(err)
    
        console.log('saved to database')
        res.redirect('/')
      })
})



MongoClient.connect('mongodb+srv://nellantestar:karamell1@cluster0-o6sra.mongodb.net/admin?retryWrites=true&w=majority', (err, database) => {
    if (err) return console.log(err)
    db = client.db('Cluster0') // whatever your database name is
    app.listen(3000, () => {
      console.log('listening on 3000')
    })
})