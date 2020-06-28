import fetch from "node-fetch";
const appName = "uludag-api";

fetch("https://api.heroku.com/apps/" + appName + "/dynos/", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/vnd.heroku+json; version=3",
  },
});
