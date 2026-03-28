import axios from "axios";

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      status: false,
      message: "Missing TikTok URL"
    });
  }

  try {
    const response = await axios.get(
      `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`
    );

    const data = response.data;

    if (!data || !data.data) {
      return res.status(500).json({
        status: false,
        message: "Invalid response"
      });
    }

    const video = data.data;

    res.status(200).json({
      status: true,
      title: video.title,
      duration: video.duration,
      cover: video.cover,
      video: video.play,
      video_hd: video.hdplay,
      music: video.music,
      author: {
        username: video.author.unique_id,
        nickname: video.author.nickname,
        avatar: video.author.avatar
      },
      stats: {
        views: video.play_count,
        likes: video.digg_count,
        comments: video.comment_count,
        shares: video.share_count
      }
    });

  } catch (err) {
    res.status(500).json({
      status: false,
      message: "API error",
      error: err.message
    });
  }
}
