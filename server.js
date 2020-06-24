const express = require("express");
const app = express();

const fetchData = require("./getData");

const port = process.env.PORT || 3000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

app.get("/", (_, response) => {
  fetchData((entryObject) => {
    response.send(JSON.stringify(entryObject));
  });
});

app.listen(port, (_) => {
  console.log("listening on " + port);
});
