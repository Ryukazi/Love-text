export default async function handler(req, res) {

  try {

    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        status: false,
        message: "Provide TikTok URL"
      });
    }

    const response = await fetch("https://fusiontik.vercel.app/api/tiktok", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36"
      },
      body: JSON.stringify({
        url: url
      })
    });

    const data = await response.json();

    return res.status(200).json({
      creator: "Denish",
      status: true,
      result: data
    });

  } catch (err) {

    return res.status(500).json({
      status: false,
      error: err.message
    });

  }

}
