import React, { Component, useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import SearchArtist from './pages/SearchArtist';
import Navbar from "./components/Navbar";
import About from "./pages/about"

export const BottomText = styled.p`

    opacity : 30%;

`



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
    <>
    <div className="App">
        <div className="container">

              <Home></Home>
          </div>

          <BottomText>by Jonathan Ingram</BottomText>
          <BottomText>Data Accessed via the Spotify Web API</BottomText> 
    </div>
    
    </>
  );
}

export default App;
