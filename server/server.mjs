import express from "express";
const app = express();

import { fetchMain, fetchSingleEntry } from "./getData.mjs";
import { fetchImage } from "./functions.mjs";

const port = process.env.PORT || 3000;

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
  let entries = await fetchMain().then((val) => val);
  for (let i = 0; i < entries.length; i++) {
    entries[i].uye_foto = await fetchImage(entries[i].yazar).then((res) => res);
  }
  response.send(JSON.stringify(entries));
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
