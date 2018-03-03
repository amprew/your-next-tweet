import React from 'react';

import Tweet from './Tweet';

export default class TweetList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="tweet-list">
        { this.props.tweets.map((e, i) => <Tweet text={e} user={this.props.user} key={i} />) }
      </section>
    );
  }
}
