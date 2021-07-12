require("dotenv").config();

// get all the packages we need
const express = require("express");
const app = express();
const connectToDatabase = require("./connectToDatabase");

const port = process.env.PORT || 3000;

/**
 * routes
 * ===========================
 * ===========================
 **/

/**
 * Home Page
 */
app.get("/", async (req, res) => {
  res.json({ message: "Welcome to my hackaton Node and MongoDB!" });
});

/**
 * Get all data
 */
app.get("/data", async (req, res) => {
  const { db } = await connectToDatabase();
  const tweets = await db.collection("Books").find({}).toArray();
  res.json({ tweets });
});

// get a single tweet
app.get("/Books/:Books_id", async (req, res) => {
  const { db } = await connectToDatabase();
  const tweet = await db
    .collection("Books")
    .findOne({ _id: req.params._id });
  res.json({ Book });
});

// create a tweet
app.post("/create", async (req, res) => {
  const { db } = await connectToDatabase();
  const tweet = await db.collection("Books").insertOne(req.body.text);
  res.json({ Book });
});

// update a tweet
app.put("/Books/:_id", async (req, res) => {
  const { db } = await connectToDatabase();
  const tweet = await db
    .collection("Books")
    .updateOne({ _id: req.params._id }, { $set: { text: req.body.text } });

  res.json({ Book });
});

// delete a tweet
app.delete("/Books/:_id", async (req, res) => {
  const { db } = await connectToDatabase();
  await db.collection("Books").deleteOne({ _id: req.params._id });
  res.code(204);
});

// express listen on 3000 and log a message
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
