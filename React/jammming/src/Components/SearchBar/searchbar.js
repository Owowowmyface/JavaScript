import React from 'react';
import './searchbar.css';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    }
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  //event handler for the input box. Takes an event object, and sets our searchTerm state variable accordingly.
  handleTermChange(e) {
    console.log(this.state.searchTerm);
    this.setState({searchTerm: e.target.value});
  }

  //takes our passed in search method (from Spotify.js > App.js > here!) and allows us to use the parent search method to update the state of the parent component.
  search() {
    this.props.onSearch(this.state.searchTerm);
  }

  //Renders the search bar. Two actions here: onChange for the input, and onClick for the search box
  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
        <a onClick={this.search}>SEARCH</a>
      </div>
    )};
}
