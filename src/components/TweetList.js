import React from 'react';

import Tweet from './Tweet';

export default class TweetList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      this.props.tweets.map((e, i) => <Tweet text={e} key={i} />)
    );
  }
}
