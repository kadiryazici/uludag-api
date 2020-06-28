import { fetchMain } from "./getData.mjs";
import { fetchImage } from "./functions.mjs";
import fs from "fs";
import fetch from "node-fetch";

const update = async () => {
  let entries = await fetchMain().then((val) => val);
  for (let i = 0; i < entries.length; i++) {
    entries[i].uye_foto = await fetchImage(entries[i].yazar).then((res) => res);
  }

  fetch(
    "https://vuedag-sozluk.firebaseio.com/.json?auth=" +
      process.env.FIREBASE_SECRET,
    {
      method: "PUT",
      body: JSON.stringify(entries),
    }
  ).then((_) => {
    process.exit();
  });
};

update();
