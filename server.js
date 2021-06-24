var LastFmNode = require('lastfm').LastFmNode;
const fs = require('fs');
var Scraper = require('images-scraper');
var cors = require('cors')

//express stuff
const express = require('express')
const app = express();
const port = 3001

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

var lastfm = new LastFmNode({
  api_key: '991ce3b092f1580bbf0a14b1ad78cf9a',
  secret: '59ecabc104ad978e525d422bd723a1fd'
});


const google = new Scraper({
  puppeteer: {
    headless: false,
  },
});

var similarBands; //variable to get similar artist


const getSimilarArtists = (originalArtist) => {


  var similarArtistList = [];
  var request = lastfm.request("artist.getInfo", {
    artist: originalArtist,
    handlers: {
        success: function(data) {

            console.log(originalArtist)
  
            var similarArtists = data.artist.similar.artist;
  
            for (bands in similarArtists){
              // console.log(similarArtists[bands].name);
              similarArtistList.push(`${similarArtists[bands].name}`);
              
            }

            similarBands = similarArtistList;
  
  
            fs.writeFileSync('music.json', JSON.stringify(similarArtists))
  
        },
        error: function(error) {
            console.log("Error: " + error.message);
        }
    }
  });


}


// getSimilarArtists('Retirement Party');


app.post('/postOriginal', (req, res) => {

  console.log(req.body);
})

app.get('/getArtist', (req, res) => {
  res.send(similarBands);
})


app.get('/', (req, res) => {
  console.log('pog')

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})