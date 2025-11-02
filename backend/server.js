import express from "express";
import 'dotenv/config'
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import cors from 'cors'

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors())

const url = process.env.MONGO_URL
const client = new MongoClient(url)
const dbName = process.env.DB_NAME;

await client.connect();

const db = client.db(dbName);
const collection = db.collection("passwords")

app.get("/", async (req, res) => {
    const findRes = await collection.find({}).toArray();
    res.json(findRes)
});

app.post("/", async (req, res) => {
    const password = req.body;
    collection.insertOne(password)
    res.send({success: true})
}) 

app.delete("/", async (req, res) => {
    const password = req.body;
    collection.deleteOne(password)
    res.send({success: true})
})

app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});

