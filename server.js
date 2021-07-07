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
    .findOne({ _id: req.params.tweetId });
  res.json({ tweet });
});

// create a tweet
app.post("/tweets", async (req, res) => {
  const { db } = await connectToDatabase();
  const tweet = await db.collection("tweets").insertOne(req.body.text);
  res.json({ tweet });
});

// update a tweet
app.put("/tweets/:tweetId", async (req, res) => {
  const { db } = await connectToDatabase();
  const tweet = await db
    .collection("tweets")
    .updateOne({ _id: req.params.tweetId }, { $set: { text: req.body.text } });

  res.json({ tweet });
});

// delete a tweet
app.delete("/tweets/:tweetId", async (req, res) => {
  const { db } = await connectToDatabase();
  await db.collection("tweets").deleteOne({ _id: req.params.tweetId });
  res.code(204);
});

// express listen on 3000 and log a message
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
