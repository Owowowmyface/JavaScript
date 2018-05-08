import React from 'react';
import './searchresults.css';
import {TrackList} from '../TrackList/tracklist';

export class SearchResults extends React.Component {
  //searchlist is relatively unremarkable. It renders a tracklist and passes down a few methods/parameters
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
          <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false}/>
      </div>
    )};
}
