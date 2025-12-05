import axios from "axios";

export default async function handler(req, res) {
  const { id, days, priceType } = req.query;
  if (!id || !days || !priceType) return res.status(400).json({ error: "Missing query parameters" });

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
      {
        params: {
          vs_currency: "usd",
          days,
          interval: "daily"
        }
      }
    );
    res.status(200).json(response.data[priceType] || []);
  } catch (error) {
    console.error("Error fetching chart data:", error);
    res.status(500).json({ error: "Failed to fetch chart data" });
  }
}
