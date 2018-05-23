import React from 'react';
import logo from '../../logo.svg';
import Form from '../Form/Form';
import TwitterBird from './twitterbird.png'
import './App.css';

//App is the main stateful component. It generates all of the displayed HTML
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetBody: 'Preview Tweet Appears here!',
      selectedProducts: [],
      issueType: "",
      outageType: "",
      validTweet: false
    };

//binding methods to the instance of App to ensure they operate correctly when passed to child components
    this.handleOutageType = this.handleOutageType.bind(this);
    this.handleIssueType = this.handleIssueType.bind(this);
    this.changeSelectedProduct = this.changeSelectedProduct.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

//Sets the outageType state, which is selected in the Form component
  handleOutageType(value) {
    this.setState({outageType: value});
  }

//Sets the issueType state, which is selected in the Form component
  handleIssueType(value) {
    this.setState({issueType: value});
  }

  handleSubmit() {
    let tweet = ''
    if (!this.state.outageType || !this.state.issueType || this.state.selectedProducts.length === 0){
      tweet = "Let's pick some options first. How about that?"
      if (this.state.validTweet) {
        this.setState({validTweet: false})
      }
    }
    else {
      //setting up some grammar for the affected products. Oxford comma ftw!
      let productList = '';
      if (this.state.selectedProducts.length === 1) {
        productList = this.state.selectedProducts[0];
      }
      else if (this.state.selectedProducts.length === 2) {
        productList = `${this.state.selectedProducts[0]} and ${this.state.selectedProducts[1]}`
      }
      else {
        productList = this.state.selectedProducts.slice(0, this.state.selectedProducts.length - 1).join(', ') + `, and ${this.state.selectedProducts[this.state.selectedProducts.length - 1]}`
      }


      if (this.state.outageType === 'outage') {
        tweet = `We're currently investigating ${this.state.issueType} issues with ${productList}. Thank you for your patience as we investigate.`
      }
      else if (this.state.outageType === 'maintenance'){
        let conjunction = this.state.selectedProducts.length > 1 ? 'are' : 'is';
        tweet = `${productList} ${conjunction} undergoing maintenance and will return shortly. Thank you for your patience.`;
      }
      this.setState({validTweet: true})
    }
    this.setState({tweetBody: tweet})
  }

//Handles selected products from a multi-select control and places them in an array when they are active.
  changeSelectedProduct(value) {
    //If the product is found in the array, remove it
    if (this.state.selectedProducts.find(productName => productName === value)) {
      let newSelectedProducts = this.state.selectedProducts.filter(product => {return product !== value});
      this.setState({selectedProducts: newSelectedProducts});
      console.log(`Removed ${value} from selectedProducts array`)
    }
    //If the product is not found in the array, add it.
    else {
      let newSelectedProducts = this.state.selectedProducts;
      newSelectedProducts.push(value);
      this.setState({selectedProducts: newSelectedProducts})
      console.log(`Added ${value} to selectedProducts array`)
    }
  }

  render() {
    return (
      <div className="App">
        <div className="Banner">
          <h1>NOC Twitter Tool</h1>
        </div>
        <Form issueType={this.state.issueType}
              outageType={this.state.outageType}
              handleIssueType={this.handleIssueType}
              handleOutageType={this.handleOutageType}
              handleProductSelect={this.changeSelectedProduct}
              handleSubmit={this.handleSubmit}
        />
        <div className="tweetDisplay">
          {this.state.tweetBody}
        </div>
      </div>
    );
  }
}

export default App;
