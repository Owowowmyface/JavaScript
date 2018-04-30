import React from 'react';
import './Form.css';

class Form extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      issue: "",
      service: "",
      outageType: "",
    };

    this.issueOptions = {
      "DOOM": "DOOM Multiplayer",
      "QC": "Quake Champions"
    };

    this.outageTypes = {
      "down": "Down",
      "up": "Up",
      "maint": "Maintenance",
      "maintup": "Maintenance Over"
    }
  }

  renderSelectOptions (opts) {
    return Object.keys(opts).map(issueOption => {
      let issueOptionValue = opts[issueOption];
      return (<option value={issueOption}>
                {issueOptionValue}
              </option>);
    });
  }

  render(){
    return (
    <div className="FormFields">
      <div className="FormTable">
        <table>
          <tr>
            <th>Issue</th>
            <th>Status</th>
          </tr>
          <tr>
            <td>
              <select className="Issue">
                {this.renderSelectOptions(this.issueOptions)}
              </select>
            </td>
            <td>
              <select className="Type">
                {this.renderSelectOptions(this.outageTypes)}
              </select>
            </td>
          </tr>
        </table>
      </div>
    </div>
   )
  }
}

export default Form;
