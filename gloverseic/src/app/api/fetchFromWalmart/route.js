//problema -- nu se transmite body-ul
import { MongoClient } from "mongodb";
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({
    token: "apify_api_1ec4MCp8vSHDioxmLdeX3OevreRwyg2Qycit",
});

const { Readable } = require('stream');
// app.use(require("body-parser").json())

async function readStream(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk.toString('utf-8')); 
  }
 //console.log("Read Strea"+chunks);
  return chunks.join('');
}

export async function POST(req, res) {
    const productUrls=JSON.stringify(req.body);
    console.log("Products url "+productUrls);
    if (!productUrls || productUrls.length === 0) {
       console.log("The url is null"); 
       return Response.json({});;
    }

    try {
      
        const { defaultDatasetId } = await client.actor("tri_angle/walmart-fast-product-scraper").call({
            urls: productUrls 
        });

        console.log("Dataset"+defaultDatasetId);
        const { items } = await client.dataset(defaultDatasetId).listItems();
        console.log("Scraped Items:", items);

        if (items.length === 0) {
            return Response.json({});;
        }

       
       return Response.json(items);
    } catch (error) {
        console.error('Failed to synchronize data:', error);
       
    }
    return Response.json({});
}
