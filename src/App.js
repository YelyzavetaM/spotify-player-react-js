import React, { Component } from "react";
import "./App.css";

let fakeServerData = {
  user: {
    name: "Lisa",
    playlists: [
      {
        name: "My favourites",
        songs: [{ name: "Song 1" }, { name: "Song 2" }, { name: "Song 3" }]
      },

      {
        name: "Playlist ",
        songs: [{ name: "Song 1" }, { name: "Song 2" }, { name: "Song 3" }]
      },

      {
        name: " Another playlist",
        songs: [{ name: "Song 1" }, { name: "Song 2" }, { name: "Song 3" }]
      },

      {
        name: "last",
        songs: [{ name: "Song 1" }, { name: "Song 2" }, { name: "Song 3" }]
      }
    ]
  }
};

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

class Filter extends Component {
  render() {
    return (
      <div>
        <img />
        <input
          type="text"
          onKeyUp={ev => this.props.onTextChange(ev.target.value)}
          placeholder="search for a playlist..."
        />
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist;
    return (
      <div className="playlist">
        <img />
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song => (
            <li className="list-item">{song.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  state = {
    serverData: {},
    filterString: ""
  };
  componentDidMount() {
    this.setState({ serverData: fakeServerData });
  }
  render() {
    return (
      <div className="App">
        {this.state.serverData.user && (
          <div>
            <h1>
              {this.state.serverData.user.name}
              's playlists
            </h1>

            <div>
              <PlaylistCounter
                playlists={this.state.serverData.user.playlists}
              />
              {/* <Aggregate /> */}
            </div>

            <Filter
              onTextChange={text => {
                this.setState({ filterString: text });
              }}
            />
            <div className="wrap">
              {this.state.serverData.user.playlists
                .filter(playlist =>
                  playlist.name
                    .toLowerCase()
                    .includes(this.state.filterString.toLowerCase())
                )
                .map(playlist => (
                  <Playlist playlist={playlist} />
                ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
