import React from 'react';
import './SearchBar.css';

//searchbar class for the full searchbar object, including sort options
class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      term: '',
      location: '',
      sortBy: 'best_match'
    };

    //defining a button label here since it causes a error highlighting in JSX
    this.buttonLabel = "Let's Go"

    //binding internal methods to "this" to ensure they catch the correct
    //"this" value and don't throw errors up.
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    //define the sort options by their Yelp API methods
    this.sortByOptions = {
      'Best Match': 'best_match',
      'Highest Rated': 'rating',
      'Most Reviewed': 'review_count'
    };
  }

  handleSortByChange(sortByOption){
    this.setState({sortBy: sortByOption})
  }

  handleTermChange(e){
    this.setState({term: e.target.value})
  }

  handleLocationChange(e){
    this.setState({location: e.target.value})
  }

  handleSearch(e){
    {this.props.searchYelp(this.state.term,
                           this.state.location,
                           this.state.sortBy)};
    e.preventDefault();
  }

  //returns 'active' if the input sortByOption = the class' sortBy state
  getSortByClass(sortByOption){
    return this.state.sortBy === sortByOption ? 'active' : '';
  }

  /*Method presents the values of sortByOptions, and gives the list items
  keys that correlate to their repsective Yelp API methods.*/
  renderSortByOptions () {
    return Object.keys(this.sortByOptions).map(sortByOption => {
      let sortByOptionValue = this.sortByOptions[sortByOption];
      return (<li className={this.getSortByClass(sortByOptionValue)}
                 key={sortByOptionValue}
                 //this binds the handleSortByChange method HERE instead of the constructor method
                 onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>
               {sortByOption}
             </li>);
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
        <input placeholder="Search Businesses" onChange={this.handleTermChange}/>
        <input placeholder="Where?" onChange={this.handleLocationChange}/>
      </div>
      <div className="SearchBar-submit">
        <a onClick={this.handleSearch}>{this.buttonLabel}</a>
      </div>
    </div>
  )
  }
}

export default SearchBar;
