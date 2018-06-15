import React from 'react';
import './MaintSelect.css';

class MaintSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleOutageChecked = this.handleOutageChecked.bind(this);
    this.displayName = this.props.typeName.replace(/^\w/, c => c.toUpperCase());
  }

  handleOutageChecked(e) {
    this.props.handleOutageType(e.target.value);
  }

  render() {
    return (<div>
      <input type="radio" id={this.props.typeName} value={this.props.typeName} onChange={this.handleOutageChecked} checked={this.props.outageType === this.props.typeName} />
      <label htmlFor={this.props.typeName}>{this.displayName}</label>
    </div>)}
}

export default MaintSelect;
