import axios from "axios";

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      status: false,
      message: "Please provide TikTok URL"
    });
  }

  try {
    const response = await axios.post(
      "https://tiktokdownload.net/wp-admin/admin-ajax.php",
      new URLSearchParams({
        action: "tikdown",
        url: url
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "Mozilla/5.0"
        }
      }
    );

    const data = response.data;

    if (!data || !data.data || !data.data.data) {
      return res.status(500).json({
        status: false,
        message: "Invalid response"
      });
    }

    const video = data.data.data;

    res.status(200).json({
      status: true,
      title: video.title,
      duration: video.duration,
      cover: video.cover,
      video: video.play,
      video_wm: video.wmplay,
      music: video.music,
      stats: {
        views: video.play_count,
        likes: video.digg_count,
        comments: video.comment_count,
        shares: video.share_count
      },
      author: {
        username: video.author.unique_id,
        nickname: video.author.nickname,
        avatar: video.author.avatar
      }
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      message: "API error",
      error: error.message
    });
  }
}
