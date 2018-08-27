import React, { Component } from "react";
import "./App.css";
import Gallery from "./components/Gallery/Gallery";
import ArtistProfile from "./components/ArtistProfile/ArtistProfile";

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

// class App extends Component {
//   state = {
//     filterString: "",
//     query: "",
//     tracks: [],
//     artist: null
//   };

//   componentDidMount() {
//     let accessToken =
//       "BQA-MRinXklH2kZpaDCsMwGiU_3ZEoJWWyTJgTll6w8G4g_GR0Hh4YaIJsTXBEsQWY0m2Gfq4We8tKj1vKbIimY_f91y40oZEdYpPkQh4wKu16-O9bc59JI7pxXlrSSO4XN8dQiI3SuW3BHxZoN4nyxyI4nl3acStDuCoF8baHp6OJZHMA";

//     fetch("https://api.spotify.com/v1/me", {
//       headers: {
//         Authorization: "Bearer " + accessToken
//       }
//     })
//       .then(response => response.json())
//       .then(data => this.setState({ user: { name: data.display_name } }));

//     fetch("https://api.spotify.com/v1/me/playlists", {
//       headers: {
//         Authorization: "Bearer " + accessToken
//       }
//     })
//       .then(response => response.json())
//       .then(data =>
//         this.setState({
//           playlists: data.items.map(item => {
//             return {
//               name: item.name,
//               imageUrl: item.images[0].url,
//               songs: []
//             };
//           })
//         })
//       );

//     const BASE_URL = "https://api.spotify.com/v1/search?";
//     let FETCH_URL = BASE_URL + "q=" + this.state.query + "&type=artist&limit=1";
//     const ALBUM_URL = "https://api.spotify.com/v1/artists/";
//     fetch(FETCH_URL, {
//       headers: {
//         Authorization: "Bearer " + accessToken
//       }
//     })
//       .then(response => response.json())
//       .then(json => {
//         const artist = json.artists.items[0];
//         this.setState({ artist });

//         FETCH_URL = `${ALBUM_URL}${artist.id}/related-artists?country=US&`;
//         fetch(FETCH_URL, {
//           headers: {
//             Authorization: "Bearer " + accessToken
//           }
//         })
//           .then(response => response.json())
//           .then(json => {
//             const { tracks } = json;
//             this.setState({ tracks });
//             console.log(tracks);
//           });
//       });
//   }

//   // search() {
//   //   const BASE_URL = "https://api.spotify.com/v1/search?";
//   //   let FETCH_URL = BASE_URL + "q=" + this.state.query + "&type=artist&limit=1";
//   //   const ALBUM_URL = "https://api.spotify.com/v1/artists/";

//   //   let accessToken =
//   //     "BQA-MRinXklH2kZpaDCsMwGiU_3ZEoJWWyTJgTll6w8G4g_GR0Hh4YaIJsTXBEsQWY0m2Gfq4We8tKj1vKbIimY_f91y40oZEdYpPkQh4wKu16-O9bc59JI7pxXlrSSO4XN8dQiI3SuW3BHxZoN4nyxyI4nl3acStDuCoF8baHp6OJZHMA";

//   //   let myOptions = {
//   //     method: "GET",
//   //     headers: {
//   //       Authorization: "Bearer " + accessToken
//   //     },
//   //     mode: "cors",
//   //     cache: "default"
//   //   };
//   //   fetch(FETCH_URL, myOptions)
//   //     .then(response => response.json())
//   //     .then(json => {
//   //       const artist = json.artists.items[0];
//   //       this.setState({ artist });

//   //       FETCH_URL = `${ALBUM_URL}${artist.id}/related-artists?country=US&`;
//   //       fetch(FETCH_URL, myOptions)
//   //         .then(response => response.json())
//   //         .then(json => {
//   //           const { tracks } = json;
//   //           this.setState({ tracks });
//   //           console.log(tracks);
//   //         });
//   //     });
//   // }

//   render() {
//     let playlistToRender =
//       this.state.user && this.state.playlists
//         ? this.state.playlists.filter(playlist =>
//             playlist.name
//               .toLowerCase()
//               .includes(this.state.filterString.toLowerCase())
//           )
//         : [];
//     return (
//       <div className="App">
//         <div className="playlists-part">
//           {this.state.user ? (
//             <div>
//               <h1>
//                 {this.state.user.name}
//                 's playlists
//               </h1>

//               <PlaylistCounter playlists={playlistToRender} />

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

//         <div className="gallery-part">
//           <form>
//             <input
//               type="text"
//               value={this.state.query}
//               onChange={event => {
//                 this.setState({ query: event.target.value });
//               }}
//               onKeyPress={event => {
//                 if (event.key === "Enter") {
//                   this.search();
//                 }
//               }}
//             />
//             <button>search</button>
//           </form>
//           {/* <Search
//             value={this.state.query}
//             onChange={event => {
//               this.setState({ query: event.target.value });
//             }}
//           /> */}
//           <Gallery />
//         </div>
//       </div>
//     );
//   }
// }

class App extends Component {
  state = {
    query: "",
    artist: null,
    tracks: []
  };

  componentDidMount() {
    let accessToken =
      "BQDemMWtT7PGgNJ-kdfaj8QdE-yECLfai160R0-gxRtdxCWfcyDSdVUfBE_TjG6MQy0z4wY3eYrZll-Bs4kKsxp8Cjg6ts0Q4CnORN5KOD3dxDsEE4_rRqXRIhFXbadTdpfy5anV7TuiRljsUC_HJ6hTD-2tmpAOjZmfHiJAg77btHOcVg";

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
      "BQDemMWtT7PGgNJ-kdfaj8QdE-yECLfai160R0-gxRtdxCWfcyDSdVUfBE_TjG6MQy0z4wY3eYrZll-Bs4kKsxp8Cjg6ts0Q4CnORN5KOD3dxDsEE4_rRqXRIhFXbadTdpfy5anV7TuiRljsUC_HJ6hTD-2tmpAOjZmfHiJAg77btHOcVg";

    let myOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken
      },
      mode: "cors",
      cache: "default"
    };

    // FETCH!!!!
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
          <div className="input-part">
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
