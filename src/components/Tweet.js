import React from 'react';

export default class Tweet extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {this.props.text}
        <br/><br/>
      </div>
    );
  }
}
