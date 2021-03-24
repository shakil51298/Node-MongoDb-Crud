const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://shakil51298:Wedeveloperb21@cluster0.pal0f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


const port = 3000;
const app = express();


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


app.get('/', (req ,res) =>{
    res.send("Hello world")
})

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`);
});