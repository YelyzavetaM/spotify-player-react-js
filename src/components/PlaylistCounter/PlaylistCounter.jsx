import React, { Component } from "react";

import "./PlaylistCounter.css";

class PlaylistCounter extends Component {
  render() {
    return (
      <div className="aggregate">
        <h2 className="sub-title">
          {this.props.playlists && this.props.playlists.length} playlists
        </h2>
      </div>
    );
  }
}

export default PlaylistCounter;
