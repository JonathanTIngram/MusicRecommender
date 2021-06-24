const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');

const app = express();
const fetch = require('node-fetch');
const server = require('http').createServer(app);
var cors = require('cors');


const io = require('socket.io')(server, {
  cors: true
})
app.use(express.json());

//Cors allows the frontend and backend to communicate
app.use(cors());

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


const spotifyApi = new SpotifyWebApi({
  accessToken: '',
  refreshToken: '',
  redirectUri: '',
  clientId: '',
  clientSecret: ''
});



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


var getSimilarArtistsImages = (artists) => {


  var imageURLs = []
  spotifyApi.searchArtists(artists[0])
  .then(function(data) {
    var artistImage = data.body.artists.items[0].images[1].url;
    imageURLs.push(artistImage);
  }, function(err) {
    console.error(err);
  });

  spotifyApi.searchArtists(artists[1])
  .then(function(data) {
    var artistImage = data.body.artists.items[0].images[1].url;
    imageURLs.push(artistImage);
  }, function(err) {
    console.error(err);
  });

  spotifyApi.searchArtists(artists[2])
  .then(function(data) {
    var artistImage = data.body.artists.items[0].images[1].url;
    imageURLs.push(artistImage);
  }, function(err) {
    console.error(err);
  });

  spotifyApi.searchArtists(artists[3])
  .then(function(data) {
    var artistImage = data.body.artists.items[0].images[1].url;
    imageURLs.push(artistImage);
  }, function(err) {
    console.error(err);
  });

  spotifyApi.searchArtists(artists[4])
  .then(function(data) {
    var artistImage = data.body.artists.items[0].images[1].url;
    imageURLs.push(artistImage);
  }, function(err) {
    console.error(err);
  });


  console.log(imageURLs)
  io.on('connection', (socket) => {
    console.log(`Socket Baby`)
    socket.emit('similarImages', imageURLs);
  })

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


var getSimilarArtists = (artist) => {
  var id;
  //first get the artist ID
  spotifyApi.searchArtists(artist)
  .then(function(data) {
    id = data.body.artists.items[0].id;
    console.log(id)
    
    //Now pass the artist id to search artists that are similar to that artist
    spotifyApi.getArtistRelatedArtists(id).then((data) => {

      io.on('connection', (socket) => {
        console.log(`Socket Baby`)
        socket.emit('similarArtists', data.body);
      })
    })
  }, function(err) {
    console.error(err);
  });
}


//Searches for playlist but returns the first song of a playlist
var getVibe = () => {
  spotifyApi.searchPlaylists('workout')
  .then(function(data) {
    var playListID = data.body.playlists.items[0];
    
    console.log(playListID)
  });
}



io.on('connection', (socket) => {

  socket.on('originalArtist', (originalArtist) => {
    console.log(`Artist recieved ${originalArtist}`);
    getSimilarArtists(originalArtist);
  })

  socket.on('simToBackend', (simArtists)  => {
    console.log(simArtists);
    getSimilarArtistsImages(simArtists);
  })

  socket.on('sendKeyword', (keyword) => {
    console.log(keyword);
    spotifyApi.searchPlaylists(keyword)
    .then(function(data) {
      var playListName = data.body.playlists.items[0].name;
      var playListURL = data.body.playlists.items[0].external_urls.spotify;
      
      console.log(playListName)
      socket.emit('playlist', {name : playListName, url : playListURL});
    });
  })

})


// var similarBands; //variable to get similar artist
// var similarArtistList = [];
// const getSimilarArtists = (originalArtist) => {

//     console.log(`OG Artist is: ${originalArtist}`)

    


// }




// var result0;
// var result1;
// var result2;
// var result3;
// var result4;

// var test = []
// //Create socket connection
// io.on('connection', socket => {
//     console.log('connected')


//     //recieve original artist from the client


//   socket.on('originalArtist', (artist) => {
//     console.log(`Original Artist Socket IO is ${artist}`)
//     // getSimilarArtists(arg);
    


//     console.log(`inside socket ${similarBands}}`)
//   });

//   socket.emit('sendSimilar', similarBands);


// });

server.listen(4000, () =>
  console.log(
    'HTTP Server up. Now go to http://localhost:4000/login in your browser.'
  )
);
