import React, { Component } from 'react';
import nlp from 'compromise';

import TweetList from '../components/TweetList';

import Tweets from '../globals/models/Tweets';

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

  processTweets(tweetsArr) {
    //if tweets less than 20, not enough to analyse


    const getTweets = new Tweets(tweetsArr);
    const tweets = getTweets.get(5);

    this.setState({
      tweets,
      loading: false
    });
  }

  render() {
    return (
      <div className="u-page-grid">
        <h2 className="title title--underline u-text-center">Tweets from <a href={`//twitter.com/${this.state.handle}`}>@{this.state.handle}</a></h2>

        { (!this.state.loading && !!this.state.tweets.length) ?
          <TweetList tweets={this.state.tweets} user={this.state.user} /> :
          'Loading' }

        <p class="u-text-center"><a href="/">Back to search</a></p>
      </div>
    );
  }
}
