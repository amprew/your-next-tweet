import React, { Component } from 'react';

export default class TwitterHandle extends Component {
  constructor() {
    super();

    this.state = {
      handle: ''
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTextChange(e) {
    this.setState({
      handle: e.target.value
    });
  }

  handleKeyPress(e) {
    if(!/[a-z0-9\-\_]+/i.test(e.key)) {
      e.preventDefault();
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.history.push(`/parody/${this.state.handle}`);
  }

  render() {
    return (
      <div className="app__wrapper">
        <div className="twitter-handle">
          <div className="u-page-grid">
            <h2 className="title">
              What will {!!this.state.handle ? `@${this.state.handle}` : 'you'} say next?!
            </h2>
            <form className="twitter-handle__form" onSubmit={this.handleSubmit}>
              <span className="twitter-handle__atsymbol">@</span>
              <input
                type="text"
                placeholder="Enter twitter handle here..."
                className="input"
                onChange={this.handleTextChange}
                onKeyPress={this.handleKeyPress}
                maxLength="100"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
