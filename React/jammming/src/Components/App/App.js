import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {SearchBar} from '../SearchBar/searchbar';
import {SearchResults} from '../SearchResults/searchresults';
import {Playlist} from '../Playlist/playlist';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: 'Trackname1',
          album: 'AlbumName1',
          artist: 'ArtistName1',
          id: 1
        },
        {
          name: 'Trackname2',
          album: 'AlbumName2',
          artist: 'ArtistName2',
          id: 2
        }
      ],
      playlistName: "Balls",
      playlistTracks: [
        {
          name: 'Trackerino 1',
          album: 'Trackerino 2',
          artist: 'ArtistNameerino1',
          id: 3
        },
        {
          name: 'Trackname2',
          album: 'AlbumName2',
          artist: 'ArtistName2',
          id: 4
        }
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
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

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => {return track.id});
    console.log(trackURIs);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
