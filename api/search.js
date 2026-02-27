import axios from "axios";
import qs from "qs";

export default async function handler(req, res) {
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({
            status: false,
            message: "Missing search query"
        });
    }

    try {
        const response = await axios.post(
            "https://www.tikwm.com/api/feed/search",
            qs.stringify({
                keywords: q,
                count: 10,
                cursor: 0,
                web: 1
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "Accept": "application/json, text/javascript, */*",
                    "Origin": "https://www.tikwm.com",
                    "Referer": "https://www.tikwm.com/",
                    "User-Agent": "Mozilla/5.0"
                }
            }
        );

        return res.status(200).json({
            status: true,
            total: response.data?.data?.videos?.length || 0,
            result: response.data?.data?.videos || []
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Request failed",
            error: error.message
        });
    }
}
