import React, { Component } from 'react';
import Link from 'react-router-dom/Link';

import TweetList from '../components/TweetList';
import Loader from '../components/Loader';

import Tweets from '../globals/models/Tweets';

export default class Parody extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      handle: this.props.match.params.handle,
      tweets: [],
      loading: true,
      error: false
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
        if(!!json.tweets.length) throw new Error();

        this.setState({
          user: json.user
        });

        return json.tweets
      })
      .then(this.processTweets)
      .catch(() => {
        this.setState({
          error: true
        });
      });
  }

  processTweets(tweetsArr) {
    if(tweetsArr.length < 10) {
      return this.setState({
        error: true
      });
    }

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
        <h2 className="title title--underline u-text-center">Tweets from <a href={`//twitter.com/${this.state.handle}`} target="_blank">@{this.state.handle}</a></h2>

        { (!this.state.loading && !!this.state.tweets.length) ?
            <TweetList tweets={this.state.tweets} user={this.state.user} /> :
          this.state.error ?
            <p class="u-text-center">Not enough tweets to analyse</p> :
          <Loader/> }

        <p class="u-text-center">
          <Link to="/">Back to search</Link>
        </p>
      </div>
    );
  }
}
