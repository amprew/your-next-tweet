import React from 'react';

export default class Tweet extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <blockquote className="tweet">
        <div className="tweet__main">
          <a className="tweet__header" href="#">
            <span className="tweet__author-avatar">
              <img alt="tweet avatar" src={this.props.user.profile_image_url}/>
            </span>
            <div className="tweet__author-name">{this.props.user.name}</div>
            <div className="tweet__author-handle" title={`@${this.props.user.screen_name}`}>@{this.props.user.screen_name}</div>
          </a>
          <div className="tweet__body">
            <p className="tweet__body-text">{this.props.text}</p>
            <p className="tweet__timestamp"><time datetime="2018-03-03T19:50">19:50 - 03 March 2018</time></p>
          </div>
        </div>
      </blockquote>
    );
  }
}
