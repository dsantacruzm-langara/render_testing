const express = require("express");
const app = express();

app.listen(process.env.PORT || 3000);

//Settings to connect to MongoDB
const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://tieinuser1:tieinmongo01@testcluster.ryzz4av.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello intruder!");
});

app.get("/test", (req, res) => {
  res.status(200).send("Testing Message");
});

app.get("/student", (req, res) => {
  //Action when connected to MongoDB
  client.connect(async (err) => {
    const collection = client.db("TestDB1").collection("Students");
    const student = await collection.find({});
    client.close();

    res.status(200).send(student);
  });
});

app.get("/student/:studentId", (req, res) => {

  const { studentId } = 

  //Action when connected to MongoDB
  client.connect(async (err) => {
    const collection = client.db("TestDB1").collection("Students");
    // perform actions on the collection object
    const query = { age: studentId };
    const student = await collection.findOne(query);
    client.close();

    res.status(200).send(student);
  });

});

app.post("/student", (req, res) => {
  //Action when connected to MongoDB
  client.connect(async (err) => {
    const collection = client.db("TestDB1").collection("Students");
    // perform actions on the collection object
    const student = await collection.insertOne(req.body);
    client.close();
  });
});
