import Twitter from 'twitter';
import { middleware as cache } from 'apicache';

export default (server) => {
  server.get('/api/twitter/:handle', cache('1 day'), (req, res) => {
    const client = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

    const params = {screen_name: req.params.handle};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (error) {
        res.send([]);
        return;
      }

      res.send({
        tweets: tweets.map(e => e.text),
        user: tweets[0].user
      });
    });
  });

};
