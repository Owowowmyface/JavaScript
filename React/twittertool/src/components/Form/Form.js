import React from 'react';
import './Form.css';
import Button from '../Button/Button';
import MaintSelect from '../MaintSelect/MaintSelect';
import IssueSelect from '../IssueSelect/IssueSelect';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    this.props.handleSubmit();
  }

  render() {
    return (
      <div className="formContainer">
        <h1>Lets Generate A Tweet!</h1>
        <h2>Select the outage type</h2>
        <form className="typeSelect">
          {
            this.props.config.outageTypes.map(type => {
              return <MaintSelect outageType={this.props.outageType} handleOutageType={this.props.handleOutageType} typeName={type} />
            })
          }
        </form>

        <h2>Select the Issue Type</h2>
        <form className="typeSelect">
          {
            this.props.config.issueTypes.map(type => {
              return <IssueSelect handleIssueType={this.props.handleIssueType} issueType={this.props.issueType} issueName={type} />
            })
          }
        </form>

        <h2 id="multi-select">Select the Affected Products</h2>
        <div className="multiSelectContainer">
          {
            Object.keys(this.props.config.products).map(product => {
              return <Button labelName={product} handleProductSelect={this.props.handleProductSelect}/>
            })
          }
        </div>
        <div className="submit-button-container">
          <div className="submit-button" onClick={this.handleSubmit}>Generate</div>
        </div>
      </div>
    )
  }
}

export default Form;
