// /api/proxy.js
export default async function handler(req, res) {
  const { endpoint, ...params } = req.query; // Extract endpoint and query parameters
  const apiKey = process.env.PEXELS_API_KEY; // Environment variable for the API key

  if (!endpoint) {
    return res.status(400).json({ error: "Missing API endpoint parameter." });
  }

  // Construct the URL for the Pexels API
  const url = `https://api.pexels.com/v1/${endpoint}?${new URLSearchParams(params)}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: apiKey,
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch data from Pexels API." });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
