import axios from "axios";

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "Coin ID is required" });

  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching coin:", error);
    res.status(500).json({ error: "Failed to fetch coin" });
  }
}
