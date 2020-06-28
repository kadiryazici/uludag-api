import express from "express";
const app = express();
import rateLimit from "express-rate-limit";

import { fetchSingleEntry } from "./getData.mjs";
import { fetchImage } from "./functions.mjs";

import * as data from "./data.json";
console.log(data);

const port = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 10000,
  max: 200,
  message: "Too many requests from this IP, please try again",
});
app.use(limiter);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

//Getting all entries
app.get("/", async (req, response) => {
  response.send(JSON.stringify(data.default));
});

//Getting only one entry
app.get("/entry/:id", async (request, response) => {
  let entry = await fetchSingleEntry(request.params.id).then((res) => res);
  response.send(JSON.stringify(entry));
});

app.get("/photo", async (request, response) => {
  let entry = await fetchImage("11234567").then((res) => res);
  response.send(entry);
});

app.listen(port, (_) => {
  console.log("listening on " + port);
});
