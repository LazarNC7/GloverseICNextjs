import { MongoClient } from "mongodb";
import { ApifyClient } from 'apify-client';
import { NextResponse } from "next/server";
const client = new ApifyClient({
    token: "apify_api_1ec4MCp8vSHDioxmLdeX3OevreRwyg2Qycit",
});

export async function POST(req, res) {
    const productRequests = await req.json();
    if (!productRequests || productRequests.length === 0) {
        console.error("The request body is empty");
        return Response.json([]);
    }else console.log("Products request="+productRequests)

    try {
        const productUrls = productRequests;
        console.log("Products url"+productUrls)
        const { defaultDatasetId } = await client.actor("tri_angle/walmart-fast-product-scraper").call({
            urls: productUrls
        });

        console.log("Dataset:", defaultDatasetId);
        const { items } = await client.dataset(defaultDatasetId).listItems();
        console.log("Scraped Items:", items);

        //aici trb sa lucrezi
        const results = items.map(item => ({
            name: item.name    
        }));

        if (results.length === 0) {
            console.error("Page not found")
            return Response.json([]);
        }

        console.log(results);
        return Response.json(results);
    } catch (error) {
        console.error('Failed to synchronize data:Internal server error', error);
    }

    return Response.json([]);
}
