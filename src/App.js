//To be able to log in to your Spotify account and
// run this app correctly follow  https://github.com/mpj/oauth-bridge-template to get an access token

import React, { Component } from "react";
import "./App.css";
import Gallery from "./components/Gallery/Gallery";
import ArtistProfile from "./components/ArtistProfile/ArtistProfile";
import PlaylistCounter from "./components/PlaylistCounter/PlaylistCounter";
import Playlist from "./components/Playlist/Playlist";

// class Filter extends Component {
//   render() {
//     return (
//       <div>
//         <img />
//         <input
//           type="text"
//           onKeyUp={ev => this.props.onTextChange(ev.target.value)}
//           placeholder="search for a playlist..."
//         />
//       </div>
//     );
//   }
// }

//               <Filter
//                 onTextChange={text => {
//                   this.setState({ filterString: text });
//                 }}
//               />
//               <div className="wrap">
//                 {playlistToRender.map(playlist => (
//                   <Playlist playlist={playlist} />
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <p />
//           )}
//         </div>

class App extends Component {
  state = {
    query: "",
    artist: null,
    tracks: []
  };

  componentDidMount() {
    let accessToken =
      "BQDo5Y4HyVlSYztquYPrTRuBvMeaYzcsCLNTjZLe1yIUbdsyVnDSA-8sJqJx1Gv5-hleqm3UcBC4CTzFtbU_E6Xb5zs2ev3gRvRPr9jzs5qCXVPcIOozACAq7bYCSOXljgULG8cZQwAifla_o7rRvPSCD2OT4lPLmBhn3EivVJ2DZphSog";

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
            return {
              name: item.name,
              imageUrl: item.images[0].url,
              songs: []
            };
          })
        })
      );
  }

  search() {
    const BASE_URL = "https://api.spotify.com/v1/search?";
    let FETCH_URL = BASE_URL + "q=" + this.state.query + "&type=artist&limit=1";
    const ALBUM_URL = "https://api.spotify.com/v1/artists/";

    let accessToken =
      "BQDo5Y4HyVlSYztquYPrTRuBvMeaYzcsCLNTjZLe1yIUbdsyVnDSA-8sJqJx1Gv5-hleqm3UcBC4CTzFtbU_E6Xb5zs2ev3gRvRPr9jzs5qCXVPcIOozACAq7bYCSOXljgULG8cZQwAifla_o7rRvPSCD2OT4lPLmBhn3EivVJ2DZphSog";

    let myOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken
      },
      mode: "cors",
      cache: "default"
    };

    fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        const artist = json.artists.items[0];
        this.setState({ artist });

        FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
        fetch(FETCH_URL, myOptions)
          .then(response => response.json())
          .then(json => {
            const { tracks } = json;
            this.setState({ tracks });
          });
      });
  }

  render() {
    let playlistToRender =
      this.state.user && this.state.playlists
        ? this.state.playlists.filter(playlist => playlist.name)
        : [];

    return (
      <div className="App">
        {/* {this.state.user && this.state.playlists} */}
        <div className="main-content-wrap">
          <div className="playlist-part">
            <h1>
              {/* {this.state.user.name} */}
              You have:
            </h1>

            <PlaylistCounter playlists={playlistToRender} />
            <div className="playlist-wrap">
              {playlistToRender.map(playlist => (
                <Playlist playlist={playlist} />
              ))}
            </div>
          </div>

          <div className="gallery-part">
            <h2>Music Player</h2>
            <div className="input-group">
              <input
                className="input"
                type="text"
                placeholder="Search for an artist"
                value={this.state.query}
                onChange={event => {
                  this.setState({ query: event.target.value });
                }}
                onKeyPress={event => {
                  if (event.key === "Enter") {
                    this.search();
                  }
                }}
              />
              <button className="btn btn-search" onClick={() => this.search()}>
                <i className="fas fa-search" />
              </button>
            </div>
            {this.state.artist !== null ? (
              <div>
                <ArtistProfile artist={this.state.artist} />
                <Gallery tracks={this.state.tracks} />
              </div>
            ) : (
              <p />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
