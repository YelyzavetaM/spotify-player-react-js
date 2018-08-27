import React, { Component } from "react";

import "./Gallery.css";

class Gallery extends Component {
  state = {
    playingUrl: "",
    audio: null,
    playing: false
  };

  playAudio(previewUrl) {
    let audio = new Audio(previewUrl);
    if (!this.state.playing) {
      audio.play();
      this.setState({
        playing: true,
        playingUrl: previewUrl,
        audio
      });
    } else {
      if (this.state.playingUrl === previewUrl) {
        this.state.audio.pause();
        this.setState({
          playing: false
        });
      } else {
        this.state.audio.pause();
        audio.play();
        this.setState({
          playing: true,
          playingUrl: previewUrl,
          audio
        });
      }
    }
  }

  render() {
    const { tracks } = this.props;
    return (
      <div className="gallery">
        {tracks.map(track => {
          const trackImg = track.album.images[0].url;
          return (
            <div
              className="track"
              onClick={() => this.playAudio(track.preview_url)}
            >
              <img className="track-img" src={trackImg} alt="track image" />
              <div className="track-name-wrap">
                <p className="track-name">{track.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Gallery;
