const express = require("express");
const app = express();
const PORT = 4590;


//Settings to connect to MongoDB
const { MongoClient} = require('mongodb');
const uri = "mongodb+srv://tieinuser1:tieinmongo01@testcluster.ryzz4av.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

app.use(express.json());

app.listen(PORT, () => {
  console.log(`it is listening to ${PORT}`);
});

app.get("/student", (req, res) => {

  //Action when connected to MongoDB
  client.connect(async err => {
    const collection = client.db("TestDB1").collection("Students");
    // perform actions on the collection object
    const query = { age: 28 };
    const student = await collection.findOne(query);
    client.close();

    res.status(200).send(student);
  });
//   const mongoDBSetting = async () => {
//     await client.connect();
//     const database = client.db("TestDB1");
//     const studentsdb = database.collection("Students");
//     const query = { name: "Diego" };
//     const student = await studentsdb.findOne(query);

//     await client.close();
//     return student;
//   };

//   res.status(200).send(mongoDBSetting());
  
});

app.post("/student", (req, res) => {

  //Action when connected to MongoDB
  client.connect(async err => {
    const collection = client.db("TestDB1").collection("Students");
    // perform actions on the collection object
    const student = await collection.insertOne(req.body);
    client.close();
  });
});
