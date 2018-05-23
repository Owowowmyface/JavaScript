import React from 'react';
import './Form.css';
import Button from '../Button/Button';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.handleOutageChecked = this.handleOutageChecked.bind(this);
    this.handleIssueChecked = this.handleIssueChecked.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //event handler for the from Input selector for Outage Type
  handleOutageChecked(e) {
    this.props.handleOutageType(e.target.value);
  }

  //event handler for the from Input selector for Issue Type
  handleIssueChecked(e) {
    this.props.handleIssueType(e.target.value);
  }

  handleSubmit(e) {
    this.props.handleSubmit();
  }

  render() {
    return (
      <div className="singleSelect">
        <h1>Lets Generate A Tweet!</h1>
        <h2>Select the outage type</h2>
        <form className="typeSelect">
          <div>
            <input type="radio" id="outagebutton" value="outage" onChange={this.handleOutageChecked} checked={this.props.outageType === 'outage'} />
            <label htmlFor="outagebutton">Outage</label>
          </div>
          <div>
            <input type="radio" id="maintbutton" value="maintenance" onChange={this.handleOutageChecked} checked={this.props.outageType === 'maintenance'} />
            <label htmlFor="maintbutton">Maintenance</label>
          </div>
        </form>

        <h2>Select the Issue Type</h2>
        <form className="typeSelect">
          <div>
            <input type="radio" id="login" value="login" onChange={this.handleIssueChecked} checked={this.props.issueType === 'login'} />
            <label htmlFor="login">Login Issues</label>
          </div>
          <div>
            <input type="radio" id="igt" value="in-game transaction" onChange={this.handleIssueChecked} checked={this.props.issueType === 'in-game transaction'} />
            <label htmlFor="igt">In-Game Transactions</label>
          </div>
        </form>

        <h2 id="multi-select">Select the Affected Products</h2>
        <div className="buttonContainer">
          <Button labelName="Product1" handleProductSelect={this.props.handleProductSelect}/>
          <Button labelName="Product2" handleProductSelect={this.props.handleProductSelect}/>
          <Button labelName="Product3" handleProductSelect={this.props.handleProductSelect}/>
        </div>
        <div className="submit-button-container">
          <div className="submit-button" onClick={this.handleSubmit}>Generate</div>
        </div>
      </div>
    )
  }
}

export default Form;
