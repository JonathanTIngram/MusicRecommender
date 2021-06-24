import axios from "axios";
import React, { useEffect, useRef, useState } from "react"
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import io from "socket.io-client"
import Home from '../pages/Home';
import SearchArtist from '../pages/SearchArtist';


export const NavLink = styled(Link)`
  text-decoration : none;
  
  opacity : 60%;
  &:hover {
    color : pink;
  }
  button {
    &:hover {
        text-shadow:
        0 0 5px #fff,
        0 0 10px #fff,
        0 0 20px #fff,
        0 0 80px #0ff,
        0 0 160px #0ff,
        0 0 180px #0ff,
        0 0 200px #0ff,
        0 0 300px #0ff;
    }
    border-radius : 5%;
    size : 100%;
    width : 20%;
    height: 50%;
    padding-bottom : 1%;
  }
`

export const NeonHeader = styled.h1`
    padding : 10%;
    font-size : 500%;
    color: #fff;
    text-shadow:
    0 0 5px #fff,
    0 0 10px #fff,
    0 0 20px #fff,
    0 0 40px #0ff,
    0 0 80px #0ff,
    0 0 90px #0ff,
    0 0 100px #0ff,
    0 0 150px #0ff;


    font-family: -apple-system, 
    Marker Felt, fantasy,
    sans-serif;


    
`


var Navbar = () => {


    return (
        <>
        <Router>
            <NavLink to="/">
              <button class="btn btn-primary">
                Home
              </button>
            </NavLink>

          <NavLink to="/SearchArtist">
            <button class="btn btn-primary">
                Search Artist
            </button>
          </NavLink>

          <NavLink to="/">
            <button class="btn btn-primary">
                Random Artist
            </button>
          </NavLink>



            <Route path="/SearchArtist"  component={SearchArtist} />
            <Route exact path="/" component={Home} />

        </Router>
        </>
    );
}

export default Navbar;