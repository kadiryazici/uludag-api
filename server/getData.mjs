import cheerio from "cheerio";
import fetch from "node-fetch";
import { fixedEntry, fetchImage } from "./functions.mjs";

/**
 * @description To fetch main page
 * @returns {Array} All entries
 */
export const fetchMain = async () => {
  let entries = await fetch("https://uludagsozluk.com/");
  let data = await entries.text();
  let $ = cheerio.load(data);
  let array = [];

  $(".li_capsul_entry").each((i, element) => {
    let result = {};

    result.baslik = $(element).find(".baslik a").text();

    result.metin = fixedEntry($, element, ".ent");

    result.yazar = $(element).find(".entry-secenekleri .kuladi").text();

    result.arti_oy = $(element)
      .find(".entry-secenekleri .oylar.arti_sayi")
      .text();

    result.eksi_oy = $(element)
      .find(".entry-secenekleri .oylar.eksi_sayi")
      .text();

    result.tarih = $(element).find(".tarih .oy4").text();

    array.push(result);
  });

  return array;
};

/**
 * @description Fetch single entry by id.
 * @param {Number} id
 */
export const fetchSingleEntry = async (id) => {
  let entry = await fetch("https://uludagsozluk.com/e/" + id);
  let data = await entry.text();
  let $ = cheerio.load(data);
  let object = {
    baslik: $(".tekentry-baslik a").text(),

    metin: fixedEntry($, ".entry-list", ".entry-p"),

    yazar: $(".alt-u.yazar").text(),

    tarih: $(".entry-date")
      .children()
      .remove()
      .end()
      .text()
      .replace(/\n?\t?\s?/g, ""),

    arti_oy: $(".entry-secenekleri .oylar.arti_sayi").text(),

    eksi_oy: $(".entry-secenekleri .oylar.eksi_sayi").text(),
  };
  object.uye_foto = await fetchImage(object.yazar).then((res) => res);
  return object;
};
