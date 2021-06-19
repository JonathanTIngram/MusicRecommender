var LastFmNode = require('lastfm').LastFmNode;
const fs = require('fs');
var Scraper = require('images-scraper');

//express stuff
const express = require('express')
const app = express();
const port = 3001

var lastfm = new LastFmNode({
  api_key: '991ce3b092f1580bbf0a14b1ad78cf9a',
  secret: '59ecabc104ad978e525d422bd723a1fd'
});


const google = new Scraper({
  puppeteer: {
    headless: false,
  },
});


console.log(lastfm)


