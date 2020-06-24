const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors);

const fetchData = require("./getData");

const port = process.env.PORT || 3000;

app.get("/", (_, response) => {
  fetchData((entryObject) => {
    response.send(JSON.stringify(entryObject));
  });
});

app.listen(port, (_) => {
  console.log("listening on " + port);
});
