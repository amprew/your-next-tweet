import React from 'react';

export default class Tweet extends React.Component {
  constructor(props) {
    super(props);
  }

  get user() {
    return this.props.user;
  }

  render() {
    return (
      <blockquote className="tweet">
        <div className="tweet__main">
          <a href={`//twitter.com/${this.user.screen_name}`} className="tweet__header" target="_blank">
            <span className="tweet__author-avatar">
              <img alt="tweet avatar" src={this.user.profile_image_url}/>
            </span>
            <div className="tweet__author-name">{this.user.name}</div>
            <div className="tweet__author-handle" title={`@${this.user.screen_name}`}>@{this.user.screen_name}</div>
          </a>
          <div className="tweet__body">
            <p className="tweet__body-text">{this.props.text}</p>
            <p className="tweet__timestamp"><time datetime="now">now</time></p>
          </div>
        </div>
      </blockquote>
    );
  }
}
