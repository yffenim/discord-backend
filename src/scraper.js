import cheerio from 'cheerio';
import fetch from 'node-fetch';


const TABLE_NAME = process.env.TABLE_NAME;
const SCAPER_URL = "https://disboard.org/servers/tag/buffy";
// const SCAPER_URL = "http://statleaders.ufc.com/";

export const scrape = async function (event, context) {
    // fetch the HTML from the UFC website
  const response = await fetch(SCAPER_URL);
  const html = await response.text();
  const $ = cheerio.load(html);

  ////////// buffy version //////////
  const resultsGroup = $(".listing-card");
  
  resultsGroup.each(function (i, result) {
    const names = $(result).find(".server-name > a").text();
    console.log(names);
  });

return {
    body: JSON.stringify({message: names}),
    statusCode: 200,
  };

};

scrape();
