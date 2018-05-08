let userAccessToken = '';
let expiresIn = '';

const clientID = '2cf60a864471448bb42f6437f974bc53';
const redirectURI = 'http://localhost:3000/'

const Spotify = {
  //get an access token and set it to the global "userAccessToken" variable
  getAccessToken() {
    //If there's already an access token saved, don't do anything.
    if (userAccessToken) {
      return userAccessToken;
    }
    //If there isn't a token, check the window to see if it's sitting there.
    else {
      console.log('Getting Access Token')
      if (window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)) {
        userAccessToken = window.location.href.match(/access_token=([^&]*)/)[1];
        expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
        window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
        //this bit of code kept resetting the website after the first search or playlist add. Really annoying.
      }
      //if the token isn't in the url, make the user sign in using Spotify's redirect authorization.
      else {
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
      }
    }
  },

  //Search for the usr's search term and return it.
  search(searchTerm) {
    //login if we need to.
    if (!userAccessToken) {
      Spotify.getAccessToken();
    }

    //install the fetch polyfill into Node.js if it's needed: $: npm install whatwg-fetch --save

    //use Fetch to search with the user's search term, and their auth bearer token.
    //first chained then(): awaits a response from the API call, and converts the response object into JavaScript Object Notation (JSON)
    //second chained then(): awaits the JSON object, converts it to an array of objects for our needs, and returns it.
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {headers: {Authorization: `Bearer ${userAccessToken}`}}).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      }
      //if the API call returns nothing, we return a blank list.
      else {
        return [];
      }
    })
  },

  //Saves the playlist to Spotify through a ridiculous set of promises and fulfillments.
  savePlaylist(playlistName, trackArray) {
    //set up some variables outside of the "then()" loop so we can continually access stuff we need.
    let playlistID = ''
    let userID = ''

    //login if we need to. Probably shouldn't need to, but who knows. /shrug.
    if (!userAccessToken) {
      Spotify.getAccessToken();
    }

    //check and make sure a playlistName and array of tracks were provided. If so, let's get the party STARTED. HELL YEAH.
    /*
      1. Use Fetch to create a future object to the /me endpoint.
      2. The first then() takes the response of this prmoise and converts it to json
      3. The second then() takes the user's ID (jsonResponse.ID) and assigns it to userID, which exists outside of this loop.
      4. Next, we use ANOTHER fetch to create a playlist. Fetch sends a post request with a JSON body, the body is our playlist's name
      5. The first chained then() awaits the response from the API call and converts the promise to a JSON object
      6. The second then() accepts that JSON object and assigns the id of the response to the playlistID variable, which exists outside of this loop
      7. AGAIN, we fetch, this time to populate the playlist with songs. The endpoint takes our out-of-loop userID and playlistID
      8. fetch sends a post request with an array of song IDs, formatted with spotify:track: in front of it because spotify likes it like that
      9. parse out that response using a couple of then()s again. Fuck yeah .then()
      10. Boom! It saves to spotify!
    */
    if (playlistName && trackArray) {
      return fetch('https://api.spotify.com/v1/me', {headers: {Authorization: `Bearer ${userAccessToken}`}}).then(response => {
        return response.json();
      }).then(jsonResponse => {
        userID = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
          headers: {Authorization: `Bearer ${userAccessToken}`},
          method: 'POST',
          body: JSON.stringify({name: playlistName})
        }).then(response => {
          return response.json();
        }).then(jsonResponse => {
          playlistID = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
            headers: {Authorization: `Bearer ${userAccessToken}`},
            method: 'POST',
            body: JSON.stringify({uris: trackArray})
          }).then(response => {
            return response.json();
          }).then(jsonResponse => {
            console.log('Playlist saved')
            return jsonResponse.id
          })
        })
      })
    }
    else {
      return
    }
  }
};

//export the module so we can use Spotify.methods in app.js
export default Spotify;
