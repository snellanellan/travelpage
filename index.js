//how to require the express
const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'Cluster0';
let db;
const com = 'comments';
const path = require('path');


app.set('view engine', 'ejs')


//to get my css running:
app.use(express.static(path.join(__dirname, 'resources')))

app.use(bodyParser.urlencoded({extended: true}))

//to create a server where browsers can connect to, use the listen method provided by express
/*
app.listen(3000, function() {
    console.log('listening on 3000')
})
*/

//to answer the get request from the browser we use the get method  
app.get('/', (req, res) => {
    //res.sendFile(__dirname+ '/index.ejs')
    var cursor = db.collection(com).find().toArray(function(err, results){
        console.log(results)
        if(err){
            console.log(err)
    
        } else {
            res.render('index.ejs', {
                'comments': results 
            })
            console.log('här')
        }

    })
})

app.post('/comments', (req, res) => {
    db.collection(com).save(req.body, (err, result) => {
        if (err) return console.log(err);
    
        console.log('saved to database')
        res.redirect('/')
      })
})


MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err)
  
    // Storing a reference to the database so you can use it later
    db = client.db(dbName)
    console.log(`Connected MongoDB: ${url}`)
    console.log(`Database: ${dbName}`)
    app.listen(3000, () => {
        console.log("lyssnar på port 3000");
        
    })
    
  })





/*

MongoClient.connect('mongodb+srv://nellantestar:karamell1@cluster0-o6sra.mongodb.net/admin?retryWrites=true&w=majority', (err, database) => {
    if(err){
        console.log(err);
    } else {
        db = database.db('Cluster0');
        app.listen(3000, () => {
            console.log("lyssnar på port 3000");
            
        });
    };
})*/