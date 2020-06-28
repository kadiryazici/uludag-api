import { fetchMain } from "./getData.mjs";
import { fetchImage } from "./functions.mjs";
import fs from "fs";

const update = async () => {
  let entries = await fetchMain().then((val) => val);
  for (let i = 0; i < entries.length; i++) {
    entries[i].uye_foto = await fetchImage(entries[i].yazar).then((res) => res);
  }
  let jsonContent = JSON.stringify(entries);

  fs.writeFile("server/data.json", jsonContent, (err) => {
    if (err) {
      return console.log(err);
    }

    console.log("JSON saved");
  });
};

update();
