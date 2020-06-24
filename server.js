const express = require("express");
const app = express();

const fetchData = require("./getData");

const port = 3000;

app.get("/", (_, response) => {
  fetchData((entryObject) => {
    response.send(JSON.stringify(entryObject));
  });
});

app.listen(port, (_) => {
  console.log("listening on " + port);
});
