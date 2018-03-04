export default class Tweets {
  constructor(tweets) {
    this.tokens = [];

    this.tweets = tweets
      .map(tweet => {
        return tweet.replace(/\@[\w\_\-]+/g, '')
          .replace(/https?\:\/\/[^\s]+/g, '')
          .replace(/\s\s+/g, ' ');
      });

    this.get = this.get.bind(this);

    this.finalWords = [];
    this.startWords = [];
    this.wordStats = {};

    this.createTweetData();
  }

  get(number) {
    const tweets = [];
    for (let i=0; i<number; i++) {
      const text = this.getTweet(3 + Math.floor(3 * Math.random()));
      tweets.push(text);
    }
    return tweets;
  }

  createTweetData(tweet_data) {
    this.tweets.forEach((tweet) => {
      const words = tweet.trim().split(' ');
      this.startWords.push(words[0]);
      this.finalWords.push(words[words.length-1]);

      words.forEach((word, i, arr) => {
        if(typeof arr[i+1] === 'undefined') return;

        if (this.wordStats.hasOwnProperty(word)) {
          this.wordStats[word].push(arr[i + 1]);
        } else {
          this.wordStats[word] = [arr[i + 1]];
        }
      });
    });
  }

  getRandom(arr) {
    const i = Math.floor(arr.length * Math.random());
    return arr[i];
  }
  
  getTweet(minLength) {
    let word = this.getRandom(this.startWords);
    const text = [word];
    let attempt = 0;

    while (this.wordStats.hasOwnProperty(word) && attempt < 100) {
      var nextWords = this.wordStats[word];
      word = this.getRandom(nextWords);
      text.push(word);
      if (text.length > minLength && this.finalWords.includes(word)) break;
      attempt++;
    }

    if (text.length < minLength) return this.getTweet(minLength);

    return text.join(' ');
  }
};
