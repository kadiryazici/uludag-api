import fetch from "node-fetch";
import cheerio from "cheerio";

/**
 * @description Fixing HTML value for client to read
 *
 * @param {Function} $
 * @param {HTMLElement} v
 * @param {String} className
 */
export const fixedEntry = ($, v, className) => {
  let fixed = $(v).find(className);
  fixed.html(fixed.html().replace(/\(bkz:/g, ""));

  fixed.find("a").each((i, element) => {
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
  let fixedHtml = fixed
    .html()
    .replace(/(<([^>]+)>)/gi, "")
    .trim();
  return fixedHtml.replace(/&quot;/g, `\"`);
};

export const fetchImage = async (user) => {
  let userName = user.replace(/\s/g, "-");
  let url = "https://" + userName + ".uludagsozluk.com";
  let response = await fetch(url);
  let html = await response.text();
  let $ = cheerio.load(html);
  return $(".user-avatar img").attr("src");
};
