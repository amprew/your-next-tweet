import React, { Component } from 'react';
import nlp from 'compromise';

import TweetList from '../components/TweetList';

export default class Parody extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      handle: this.props.match.params.handle,
      tweets: [],
      loading: true
    };

    this.tokens = [];
    this.processTweets = this.processTweets.bind(this);
    this.createTokens = this.createTokens.bind(this);
  }

  componentDidMount() {
    fetch(`/api/twitter/${this.state.handle}`)
      .then((res) => {
        if(!res.ok) {
          throw new Error(res.statusText);
        }

        return res.json();
      })
      .then((json) => {
        this.setState({
          loading: false,
          user: json.user
        });

        return json.tweets
      })
      .then(this.processTweets)
      .catch(()=>{});
  }

  createTokens(tweets) {
    const terms = nlp(tweets).terms().list;

    for (let i = 0; i < terms.length; i++) {
      this.tokens.push(terms[i].terms[0]._text);
    }
  }

  findNextWord(currentWord) {
    const nextWords = [];
    for (let w = 0; w < this.tokens.length-1; w++) {
      if (this.tokens[w] == currentWord) {
        nextWords.push(this.tokens[w+1]);
      }
    }
    return nextWords[Math.floor(Math.random() * nextWords.length)];
  }

  processTweets(tweets) {
    this.createTokens(tweets.join('\r\n\r\n'));
    let currentWord = this.tokens[Math.floor(Math.random() * this.tokens.length)];
    let sentence = currentWord + " ";

    while (sentence.length < 150) { // while we haven't found a period
      currentWord = this.findNextWord(currentWord);
      sentence += currentWord + " ";
    }

    this.setState({
      tweets: [sentence],
      loading: false
    });
  }

  render() {
    return (
      <div className="tweet-list u-page-grid">
        <h2 className="title title--underline u-text-center">Tweets from @{this.state.handle}</h2>

        { (!this.state.loading && !!this.state.tweets.length) ? <TweetList tweets={this.state.tweets} /> : 'Loading' }
      </div>
    );
  }
}
