import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {SearchBar} from '../SearchBar/searchbar';
import {SearchResults} from '../SearchResults/searchresults';
import {Playlist} from '../Playlist/playlist';
import Spotify from '../../util/Spotify'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: []
    };
    //bind our methods to the current state of (this). Otherwise child components can't access stuff in this file.
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  //method is passed down to Track class for use with + button in SearchResults
  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      console.log('Item already in playlist');
    }
    else {
      let playlistArray = this.state.playlistTracks;
      playlistArray.push(track);
      this.setState({playlistTracks: playlistArray})
    }
  }

  //method is passed down to Track class for use with - button in PlayList
  removeTrack(track) {
    let playlistArray = this.state.playlistTracks.filter(filterTrack => {return filterTrack.id !== track.id});
    this.setState({playlistTracks: playlistArray});
  }

  //set's the playlistName state to a new name
  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  //Saves the name of the playlist. Passed to the Playlist component class
  savePlaylist() {
    //format the track IDs to match Spotify's API documentation
    let trackURIs = this.state.playlistTracks.map(track => `spotify:track:${track.id}`);
    //use the Spotify module's SavePlaylist, with the playlistname and track URIs
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    //update the state of Playlistname and Playlist tracks to clear it out
    this.setState({playlistName: 'New Playlist', playlistTracks: []})
  }

  //Searches for the search term. Passed to the SearchBar component class
  search(searchTerm) {
    //use Spotify.search, which returns a promise object.
    //convert the promise to results, then setstate using the results from the promise when it fulfills.
    Spotify.search(searchTerm).then(results => {
      this.setState({searchResults: results})
    });
  }

  //In the end, this is it for rendering the main app. Pretty incredible how small it is!
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

//export App for use with index.js in the base src folder
export default App;
