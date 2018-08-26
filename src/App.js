import React, { Component } from "react";
import "./App.css";

let fakeServerData = {
  user: {
    name: "Lisa",
    playlists: [
      {
        name: "My favourites",
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
        <h3>{playlist.name}</h3>
        <img className="playlist-img" src={playlist.imageUrl} />
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
    // this.setState({ serverData: fakeServerData });
    let accessToken =
      "BQDF9ahrofYSFWD0H9CbQXOW2Ue32MABvjOiIk3BInNsDl9QN35mZleS2okR4WUVnGeQ_aDf-8J8WpEro9bB9O1G3xrAc9Hkegix8nIreZ3O1iNDMGQNuyD9qRAaxKr2mQVimmhZlqtOV3uyeR-ftOlQpj2DnIxeuEHfGWyranXRJVJYuQ";
    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
      .then(response => response.json())
      .then(data => this.setState({ user: { name: data.display_name } }));

    fetch("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
      .then(response => response.json())
      .then(data =>
        this.setState({
          playlists: data.items.map(item => {
            console.log(data.items);

            return {
              name: item.name,
              imageUrl: item.images[0].url,
              songs: []
            };
          })
        })
      );
  }
  render() {
    let playlistToRender =
      this.state.user && this.state.playlists
        ? this.state.playlists.filter(playlist =>
            playlist.name
              .toLowerCase()
              .includes(this.state.filterString.toLowerCase())
          )
        : [];
    return (
      <div className="App">
        {this.state.user ? (
          <div>
            <h1>
              {this.state.user.name}
              's playlists
            </h1>

            <PlaylistCounter playlists={playlistToRender} />

            <Filter
              onTextChange={text => {
                this.setState({ filterString: text });
              }}
            />
            <div className="wrap">
              {playlistToRender.map(playlist => (
                <Playlist playlist={playlist} />
              ))}
            </div>
          </div>
        ) : (
          <p />
        )}
      </div>
    );
  }
}

export default App;
