// /api/coins.js
import axios from "axios";

let cache = null;
let lastFetch = 0;

export default async function handler(req, res) {
  const now = Date.now();
  const cacheDuration = 60 * 1000; // 1 minute

  if (cache && now - lastFetch < cacheDuration) {
    return res.status(200).json(cache);
  }

  try {
    const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
      params: {
        vs_currency: "usd",
        category: "layer-1",
        price_change_percentage: "1h",
        order: "market_cap_desc",
        per_page: 100,
        page: 1
      }
    });

    cache = response.data;
    lastFetch = now;
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching coins:", error.response?.status, error.message);
    if (error.response?.status === 429) {
      return res.status(503).json({ error: "Too many requests to CoinGecko API. Please try again later." });
    }
    res.status(500).json({ error: "Failed to fetch coins" });
  }
}
