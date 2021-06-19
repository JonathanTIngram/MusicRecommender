import React, { Component, useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';



function App() {

  var [similarList, setSimilarList] = useState([]);


  const getSimilarArtists = () => {


    axios.get(`http://localhost:3001/getArtist`).then(res => {
      //console.log(res.data)
      console.log(res.data);
      setSimilarList(res.data)
  }).catch(err => console.log(err));
  
  }

  return (
    <div className="App">
        <div className="container">
              
        

              <h1>AAA</h1>

              <button onClick={() => {
                getSimilarArtists();
              }}>Test</button>

              <h1>{similarList[0]}</h1>

              
          </div>
    </div>
  );
}

export default App;
