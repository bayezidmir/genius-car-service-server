const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(cors());
app.use(express.json());

// Copied from MOngoDB atlas

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s93bk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const serviceList = client.db("geniusCar").collection("services");

    // reading all data from database
    app.get("/service", async (req, res) => {
      const query = {};
      const cursor = serviceList.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });
    // reading single data from database
    app.get("/service/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await serviceList.findOne(query);
      res.send(service);
    });
  } finally {
    // client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello world from Node");
});

app.listen(port, () => {
  console.log("The server is up and running from port:", port);
});
