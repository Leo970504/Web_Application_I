'use strict';

const e = React.createElement;

class WelcomeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { english: true };
  }

  render() {
    return React.createElement('button',
      { onClick: () => { this.setState({ english: !this.state.english }) } },
      this.state.english ? 'Hello' : 'Ciao');
  }
}

const container = document.querySelector('#react-container');
ReactDOM.render(React.createElement(WelcomeButton), container);