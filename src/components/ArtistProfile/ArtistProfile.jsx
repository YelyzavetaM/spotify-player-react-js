import React, { Component } from "react";

import "./ArtistProfile.css";

class ArtistProfile extends Component {
  render() {
    let artist = { name: "", followers: { total: "" } };
    artist = this.props.artist !== null ? this.props.artist : artist;
    console.log(artist);

    return (
      <div className="artist-profile">
        <img src={artist.images[0].url} alt="artist" className="artist-img" />
        <p className="artist-name">{artist.name}</p>
        {/* <p>{artist.followers.total}</p> */}
      </div>
    );
  }
}

export default ArtistProfile;
