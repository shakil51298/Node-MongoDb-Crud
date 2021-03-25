const express = require('express');
const bodyParser = require("body-parser");
const objectId = require('mongodb').ObjectId;

const MongoClient = require('mongodb').MongoClient;
const { ObjectID } = require('bson');
const uri = "mongodb+srv://shakil51298:Webdeveloper21mongo@cluster0.bptoi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const port = 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

  client.connect(err => {
    const pCollection = client.db("organicdb").collection("Products");
    // sending saved data to clint site as api
    app.get('/products',(req,res)=>{
      pCollection.find({})
      .toArray((err , documents )=>{
        res.send(documents)
      }) 

    })
    app.get('/', (req, res) => {
      res.sendFile(__dirname + "/index.html")
    })
    
    app.post("/addProduct", (req, res) => {
      const product = req.body;
      pCollection.insertOne(product,()=>{
        console.log("product added to database");
        res.send("product save success to database!!")
      })

      console.log(product)
    });

    app.delete('/delete/:id', (req, res)=>{
      pCollection.deleteOne({_id : ObjectID(req.params.id)})
      .then(res => {
        console.log(res);
      })
    })
    

  })







app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});




