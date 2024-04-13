import { TwitterApi } from 'twitter-api-v2';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const twitterClient = new TwitterApi({
        appKey: process.env.TWITTER_API_KEY,
        appSecret: process.env.TWITTER_API_SECRET,
        accessToken: process.env.TWITTER_ACCESS_TOKEN,
        accessSecret: process.env.TWITTER_ACCESS_SECRET,
      });

      // Para la versión v2, usa 'twitterClient.v2'.
      const tweetResponse = await twitterClient.v2.tweet(req.body.message);
      res.status(200).json({ status: 'Tweet enviado!', data: tweetResponse });
    } catch (error) {
      res.status(500).json({ error: `Error al enviar el tweet: ${error.message}` });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}