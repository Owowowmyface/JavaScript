import React from 'react';
import './IssueSelect.css';

class IssueSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleIssueChecked = this.handleIssueChecked.bind(this);
    this.displayName = this.props.issueName.label.replace(/^\w/, c => c.toUpperCase());
  }

  handleIssueChecked(e) {
    this.props.handleIssueType(e.target.value);
  }

  render() {
    return (<div>
      <input type="radio" id={this.props.issueName.name} value={this.props.issueName.name} onChange={this.handleIssueChecked} checked={this.props.issueType === this.props.issueName.name} />
      <label htmlFor={this.props.issueName.name}>{this.displayName}</label>
    </div>)}
}

export default IssueSelect;
