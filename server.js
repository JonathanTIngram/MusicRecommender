var LastFmNode = require('lastfm').LastFmNode;
const fs = require('fs');
var Scraper = require('images-scraper');

//express stuff
const express = require('express')
const app = express()
const port = 3000

var lastfm = new LastFmNode({
  api_key: '991ce3b092f1580bbf0a14b1ad78cf9a',
  secret: '59ecabc104ad978e525d422bd723a1fd'
});


const google = new Scraper({
  puppeteer: {
    headless: false,
  },
});



var request = lastfm.request("artist.getInfo", {
  artist: "Knocked Loose",
  handlers: {
      success: function(data) {

          var similarArtists = data.artist.similar.artist;

          for (bands in similarArtists){
            console.log(similarArtists[bands].name)
          }


          fs.writeFileSync('music.json', JSON.stringify(similarArtists))

      },
      error: function(error) {
          console.log("Error: " + error.message);
      }
  }
});


var getSimilarArtists = (artists) => {

  for (let bands in artists){

    otherArtist = artists[bands];

    console.log(artists[bands]);
    var img = google.scrape(otherArtist, 1);

    console.log(img)

    // console.log(`The image url is: ${img[0].url}`);

  }
}


// app.get('/', (req, res) => {
//   getSimilarArtists(request);
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })