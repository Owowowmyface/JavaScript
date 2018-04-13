import React from 'react';
import './SearchBar.css';

//define the sort options by their Yelp API methods
const sortByOptions = {
  'Best Match': 'best_match',
  'Highest Rated': 'rating',
  'Most Reviewed': 'review_count'
};

//defining a button label here since it causes a error highlighting in JSX
const buttonLabel = "Let's Go"

//searchbar class for the full searchbar object, including sort options
class SearchBar extends React.Component {
  /*Method presents the values of sortByOptions, and gives the list items
  keys that correlate to their repsective Yelp API methods.*/
  renderSortByOptions () {
    return Object.keys(sortByOptions).map(sortByOption => {
      let sortByOptionValue = sortByOptions[sortByOption];
      return <li key={sortByOptionValue}>{sortByOption}</li>;
    });
  }

  //standard render method for the search bar.
  render() {
    return (
    <div className="SearchBar">
      <div className="SearchBar-sort-options">
        <ul>
          {this.renderSortByOptions()}
        </ul>
      </div>
      <div className="SearchBar-fields">
        <input placeholder="Search Businesses" />
        <input placeholder="Where?" />
      </div>
      <div className="SearchBar-submit">
        <a>{buttonLabel}</a>
      </div>
    </div>
  )
  }
}

export default SearchBar;
