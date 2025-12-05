import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          category: "layer-1",
          price_change_percentage: "1h",
          order: "market_cap_desc",
          per_page: 100,
          page: 1
        }
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching coins:", error);
    res.status(500).json({ error: "Failed to fetch coins" });
  }
}
