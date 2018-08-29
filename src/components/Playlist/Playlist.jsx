import React, { Component } from "react";

import "./Playlist.css";

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist;
    return (
      <div className="playlist">
        <img className="playlist-img" src={playlist.imageUrl} />
        <h3 className="playlist-name">{playlist.name}</h3>
        {/* <ul>
            {playlist.songs.map(song => (
              <li className="list-item">{song.name}</li>
            ))}
          </ul> */}
      </div>
    );
  }
}

export default Playlist;
