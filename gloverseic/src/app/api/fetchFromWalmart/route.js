//problema -- nu se transmite body-ul
import { MongoClient } from "mongodb";
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({
    token: "apify_api_1ec4MCp8vSHDioxmLdeX3OevreRwyg2Qycit",
});

const { Readable } = require('stream');

async function readStream(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk.toString('utf-8')); // Ensure the correct encoding is used
  }
 //console.log("Read Strea"+chunks);
  return chunks.join('');
}

export async function POST(req, res) {
    const productUrls=JSON.stringify(req.body);
    console.log("Products url "+productUrls);
    if (!productUrls || productUrls.length === 0) {
       // res.status(400).json({ message: "No URLs provided" });
       console.log("The url is null"); 
       return Response.json({});;
    }

    try {
        // Use the URLs in your Apify call, assuming Apify setup requires them
        const { defaultDatasetId } = await client.actor("tri_angle/walmart-fast-product-scraper").call({
            urls: productUrls // Make sure your Apify scraper expects URLs in this format
        });

        console.log("Dataset"+defaultDatasetId);
        // Fetch results from the actor's dataset
        const { items } = await client.dataset(defaultDatasetId).listItems();
        console.log("Scraped Items:", items);

        if (items.length === 0) {
           // res.status(404).json({ message: "No data returned from Apify" });
            return Response.json({});;
        }

        // Respond with the fetched items
       // res.status(200).json(items);
       return Response.json(items);
    } catch (error) {
        console.error('Failed to synchronize data:', error);
       // res.status(500).json({ message: 'Failed to synchronize data', error: error.toString() });
       
    }
    return Response.json({});
}
