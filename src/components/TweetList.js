import React, { Component } from 'react';
import Twitter from 'twitter';

export default class TwitterHandle extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      handle: this.props.match.params.handle
    };
  }

  componentWillMount() {
    this.client = new Twitter({
      consumer_key: process.env.REACT_APP_CONSUMER_KEY,
      consumer_secret: process.env.REACT_APP_CONSUMER_SECRET,
      access_token_key: process.env.REACT_APP_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.REACT_APP_ACCESS_TOKEN_SECRET
    });
  }

  // componentDidMount() {
  //   debugger;
  //   const user = {screen_name: this.state.handle};
  //   this.client.get('statuses/user_timeline', user, (error, tweets, response) => {
  //     if (error) {
  //       console.log(error);
  //       return;
  //     }

  //     //no error

  //     console.log(tweets);
  //   });
  // }

  render() {
    return (
      <div className="tweet-list u-page-grid">
        <h2 className="title title--underline u-text-center">Tweets from @{this.state.handle}</h2>
        <ul></ul>
      </div>
    );
  }
}
