const cheerio = require("cheerio");
const fetch = require("node-fetch");

const fixedEntry = ($, v) => {
  let fixedEntry = $(v).find(".ent");
  fixedEntry.html(fixedEntry.html().replace(/\(bkz:/g, ""));

  fixedEntry.find("a").each((i, element) => {
    let href = $(element).attr("href");
    if ($(element).text() == "spoiler") {
      $(element).attr("href", "#");
    } else {
      if (href.includes("/k/")) {
        $(element).text($(element).text().replace(/bkz:/g, ""));
        if (!$(element).text().includes("bkz")) {
          $(element).attr("vue-use-this", href.replace(/\/k?/g, ""));
          $(element).text(
            `(bkz: ${href.replace(/\/k?/g, "").split("-").join(" ")})`
          );
        }
      } else {
        $(element).text(href);
      }
    }
  });
  let fixedHtml = fixedEntry.html().replace(/(<([^>]+)>)/gi, "");
  return fixedHtml.replace(/&quot;/g, `\"`);
};

const fetchData = (callback) => {
  fetch("https://uludagsozluk.com/")
    .then((res) => {
      return res.text();
    })
    .then((data) => {
      let $ = cheerio.load(data);
      let array = [];

      $(".li_capsul_entry").each((i, element) => {
        let result = {};
        result.baslik = $(element).find(".baslik a").text();
        result.metin = `${fixedEntry($, element)}`;
        result.yazar = $(element).find(".entry-secenekleri .kuladi").text();
        result.arti_oy = $(element)
          .find(".entry-secenekleri .oylar.arti_sayi")
          .text();
        result.eksi_oy = $(element)
          .find(".entry-secenekleri .oylar.eksi_sayi")
          .text();
        result.uye_foto = `https://www.uludagsozluk.com/rs/profil/img/harf/${result.yazar[0]}.jpg`;

        result.tarih = $(element).find('.tarih .oy4').text();

        array.push(result);
      });
      callback(array);
    });
};

module.exports = {
  fetchData,
  fixedEntry,
};
