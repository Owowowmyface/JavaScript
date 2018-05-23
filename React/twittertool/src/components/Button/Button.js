import React from 'react';
import './Button.css';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(label) {
    console.log(label);
    if (this.state.isActive) {
      this.setState({isActive: false})
    }
    else {
      this.setState({isActive: true})
    }
    this.props.handleProductSelect(label);
  }

  render() {
    let className = this.state.isActive ? 'button-on' : 'button-off'
    return (
      <div className={className}
      value={this.props.labelName}
      onClick={() => this.handleClick(this.props.labelName)}> {this.props.labelName} </div>)
  }
}

export default Button;
