const express = require('express')
const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: true
})


require('dotenv').config();
const fs = require('fs');

var cors = require('cors');
app.use(express.json());



const scopes = [
  'ugc-image-upload',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming',
  'app-remote-control',
  'user-read-email',
  'user-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-read-private',
  'playlist-modify-private',
  'user-library-modify',
  'user-library-read',
  'user-top-read',
  'user-read-playback-position',
  'user-read-recently-played',
  'user-follow-read',
  'user-follow-modify'
];

app.get('/login', (req, res) => {
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

app.get('/callback', (req, res) => {
  const error = req.query.error;
  const code = req.query.code;
  const state = req.query.state;

  if (error) {
    console.error('Callback Error:', error);
    res.send(`Callback Error: ${error}`);
    return;
  }

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      const access_token = data.body['access_token'];
      const refresh_token = data.body['refresh_token'];
      const expires_in = data.body['expires_in'];

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      console.log('access_token:', access_token);
      console.log('refresh_token:', refresh_token);

      console.log(
        `Sucessfully retreived access token. Expires in ${expires_in} s.`
      );
      res.send('Success! You can now close the window.');

      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const access_token = data.body['access_token'];

        console.log('The access token has been refreshed!');
        console.log('access_token:', access_token);
        spotifyApi.setAccessToken(access_token);
      }, expires_in / 2 * 1000);
    })
    .catch(error => {
      console.error('Error getting Tokens:', error);
      res.send(`Error getting Tokens: ${error}`);
    });
});

//setup Last FM API
var LastFmNode = require('lastfm').LastFmNode;
var SpotifyWebApi = require('spotify-web-api-node');

var lastfm = new LastFmNode({
    api_key: process.env.lastfmAPIKEY,
    secret: process.env.lastfmSECRET
});

var spotifyApi = new SpotifyWebApi({
  clientId: process.env.spotifyClient,
  clientSecret: process.env.spotifySecret
});


// Search artists whose name contains 'Love'

//getGenres
//getSimilarArtists
//getImages


var getOriginalArtistImage = (artist) => {

  spotifyApi.searchArtists(artist)
  .then(function(data) {
    var artistImage = data.body.artists.items[0].images[1].url;
    console.log(`Picture of ${artist}`, artistImage);
  }, function(err) {
    console.error(err);
  });

} 

var getArtistGenre = (artist) => {

  spotifyApi.searchArtists(artist)
  .then(function(data) {
    var genres = data.body.artists.items[0].genres;
    console.log(`Genres of ${artist}`, genres);
  }, function(err) {
    console.error(err);
  });

}


var id;

var getArtistID = (artist) => {
  spotifyApi.searchArtists(artist)
  .then(function(data) {
    id = data.body.artists.items[0].id; 


  }, function(err) {
    console.error(err);
  });
  console.log(id)

}

getArtistID('Joji');
console.log(id)


// spotifyApi.getArtistRelatedArtists(getArtistID('Knocked Loose'))
//   .then(function(data) {
//     console.log(data.body);
//   }, function(err) {
//     done(err);
//   });




http.listen(4000, function() {
  console.log('listening on port 4000')
})