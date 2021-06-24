const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');

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

var theAccessToken;

const spotifyApi = new SpotifyWebApi({
  redirectUri: 'http://localhost:4000/callback',
  clientId: '2daa6462e7b14aa2b780f7bb309b6fc1',
  clientSecret: '14114e556a044c318da5b16f4410d287'
});

const app = express();

app.get('/', (req, res) => {
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
    console.log(data.body.artists.items[0].id); 
  }, function(err) {
    console.error(err);
  });
  console.log(id)

}


spotifyApi.setAccessToken('BQCcPsXwfL6G9Dfb16HyF1tiC339g1Lcq30aVGfLpJ9HlW2Nc7F8gbUG5MMHX40jP1_KijFPXFO0dwbJeMyy-pDkC1f3VrWSZ7ZW0GDNeGS7b9I_DBMEyw-CxT9bTy48XMx3PFHh8MhaQf4Vxc1uJg7AAmSdBj9OWPsW5bm7OMkjeboyIgOYlciJwJYad5fbD1-Ho8vAgCxCdWHFNsaRxCsonCsNWZU_o6PpIR0ljWKfcrGo4HtPPsN2VifsOh5Z-b9nLc_NDCcu8TTNm7gW6YSg_Kw3tpPaaH5ao1U4EpjRi7mz')

getOriginalArtistImage('Joji')


app.listen(4000, () =>
  console.log(
    'HTTP Server up. Now go to http://localhost:4000/login in your browser.'
  )
);