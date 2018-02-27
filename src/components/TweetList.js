import React from 'react';

export default class TweetList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      this.props.tweets.join('\n')
    );
  }
}
