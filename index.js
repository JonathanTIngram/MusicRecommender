const express = require('express')
const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: true
})

const fs = require('fs');

var cors = require('cors');
app.use(express.json());


var Scraper = require('images-scraper');


//for getting artist images
const google = new Scraper({
  puppeteer: {
    headless: false,
  },
});

//setup Last FM API
var LastFmNode = require('lastfm').LastFmNode;

var lastfm = new LastFmNode({
    api_key: '991ce3b092f1580bbf0a14b1ad78cf9a',
    secret: '59ecabc104ad978e525d422bd723a1fd'
});
  


var similarBands; //variable to get similar artist
var similarArtistList = [];
const getSimilarArtists = (originalArtist) => {

    console.log(`OG Artist is: ${originalArtist}`)

    var request = lastfm.request("artist.getInfo", {
        artist: originalArtist,
        handlers: {
            success: function(data) {

                console.log(`inside request ${originalArtist}`)

                var similarArtists = data.artist.similar.artist;

                for (bands in similarArtists){
                // console.log(similarArtists[bands].name);
                similarArtistList.push(`${similarArtists[bands].name}`);
                
                }

                similarBands = similarArtistList;
                return similarBands;

            },
            error: function(error) {
                console.log("Error: " + error.message);
            }
        }
});


}

//Cors allows the frontend and backend to communicate
app.use(cors());


var result0;
var result1;
var result2;
var result3;
var result4;

var test = []
//Create socket connection
io.on('connection', socket => {
    console.log('connected')


    //recieve original artist from the client


  socket.on('originalArtist', (arg) => {
    console.log(`Original Artist Socket IO is ${arg}`)
    getSimilarArtists(arg);
    (async () => {
      result0 = await google.scrape(`${similarBands[0]} music artist`, 1);
      result1 = await google.scrape(`${similarBands[1]} music artist`, 1);
      result2 = await google.scrape(`${similarBands[2]} music artist`, 1);
      result3 = await google.scrape(`${similarBands[3]} music artist`, 1);
      result4 = await google.scrape(`${similarBands[4]} music artist`, 1);



      result0 = result0[0].url;
      result1 = result1[0].url;
      result2 = result2[0].url;
      result3 = result3[0].url;
      result4 = result4[0].url;


      console.log(`Image 0 URL: ${result0}`);
      console.log('result1', result1);
      console.log('result2', result2);
      console.log('result3', result3);
      console.log('result4', result4);

      sendImages = [result0, result1, result2, result3, result4]

      socket.emit('artistImages', sendImages)

    })();

    console.log(`inside socket ${similarBands}}`)
  });

  socket.emit('sendSimilar', similarBands);


});

http.listen(4000, function() {
  console.log('listening on port 4000')
})