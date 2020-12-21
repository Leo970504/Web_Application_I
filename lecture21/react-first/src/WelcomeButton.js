import React from 'react';

class WelcomeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { english: true };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ english: !this.state.english });
  }

  render() {
    return <button onClick={this.handleClick}>
      {this.state.english ? 'Hello' : 'Ciao'}
    </button>
  }
}

export default WelcomeButton;