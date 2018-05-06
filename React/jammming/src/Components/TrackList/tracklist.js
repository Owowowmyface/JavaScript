import React from 'react';
import './tracklist.css';
import {Track} from '../Track/track';

export class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map(track => <Track track={track} key={track.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval}/>)}
      </div>
    );
  }
}
