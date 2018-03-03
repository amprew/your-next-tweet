import Tweets from '../globals/models/Tweets';

let tweetModel;
let inputTweets;

describe('Tweet model', () => {
  describe('when model is instantiated', () => {
    beforeAll(() => {
      inputTweets = [
        'first1 middle middle middle last1',
        'first2 middle middle last2',
        'first3 @handle https://aaaaa http://aaaaaa last3',
        'first4 middle middle last4'
      ];

      tweetModel = new Tweets(inputTweets);
    });

    test('creates instance of tweet model', () => {
      expect(tweetModel.constructor.name).toEqual('Tweets');
    });

    test('removes all links, handles, and multi spaces', () => {
      expect(tweetModel.tweets[2]).toEqual('first3 last3')
    });

    test('creates array of first word in all tweets', () => {
      expect(tweetModel.startWords).toEqual(['first1', 'first2', 'first3', 'first4'])
    });

    test('creates array of last word in all tweets', () => {
      expect(tweetModel.finalWords).toEqual(['last1', 'last2', 'last3', 'last4'])
    });

    test('creates an object of all common used words', () => {
      expect(tweetModel.wordStats).toEqual({
        first1: expect.any(Array),
        first2: expect.any(Array),
        middle: expect.any(Array),
        first3: expect.any(Array),
        first4: expect.any(Array)
      });
    });
  });

  describe('when the tweet get method is called', () => {
    test('creates a new array of tweets based on number param', () =>{
      const newTweets = tweetModel.get(5);
      expect(Array.isArray(newTweets)).toEqual(true);
      expect(newTweets.length).toBe(5);
    });
  });
});
