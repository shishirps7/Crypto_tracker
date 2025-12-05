import axios from "axios";

export default async function handler(req, res) {
  const { id } = req.query;        // coin ID (bitcoin, ethereum, etc.)
  const { days = 30, priceType = "prices" } = req.query; // default values

  try {
    // Fetch market chart data from CoinGecko
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
      {
        params: {
          vs_currency: "usd",
          days,
          interval: "daily" // optional: adjust based on `days`
        }
      }
    );

    // Ensure the requested priceType exists
    const data = response.data[priceType] || [];
    res.status(200).json({ [priceType]: data });

  } catch (error) {
    console.error("Error fetching chart data:", error.response?.status, error.message);

    // Handle CoinGecko rate-limiting
    if (error.response?.status === 429) {
      return res.status(503).json({ error: "Too many requests to CoinGecko API. Try again later." });
    }

    // Return empty array instead of crashing frontend
    res.status(500).json({ [priceType]: [] });
  }
}
