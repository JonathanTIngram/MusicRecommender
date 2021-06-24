import axios from "axios";
import React, { useEffect, useRef, useState } from "react"
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import io from "socket.io-client"
import SearchArtist from './SearchArtist';
import About from './about';

export const BottomText = styled.p`

    opacity : 30%;
    verticle-align : bottom;
`

//neon effect origin: https://codepen.io/AllThingsSmitty/pen/VzXrgY
export const NavLink = styled(Link)`
  text-decoration : none;


  h1 {
      &:hover {
        text-shadow:
        0 0 30px #e83283,
        0 0 40px #30add5,
        0 0 50px #e83283,
        0 0 60px #30add5,
        0 0 40px #e83283,
        0 0 80px #30add5,
        0 0 90px #e83283,
        0 0 100px #30add5,
        0 0 150px #e83283,
        0 0 175px #30add5,
        0 0 250px #e83283;
    }
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

  }
`


export const NeonHeader = styled.h1`

    font-size : 500%;
    opacity : 90%;
    color: #white;
    text-shadow:
    0 0 30px #e83283,
    0 0 40px #30add5,
    0 0 50px #e83283,
    0 0 60px #30add5,
    0 0 40px #e83283,
    0 0 80px #30add5,
    0 0 90px #e83283,
    0 0 100px #30add5,
    0 0 150px #e83283,
    0 0 175px #30add5,
    0 0 250px #e83283;


    font-family: -apple-system, 
    Marker Felt, fantasy,
    sans-serif;


    
`

var Home = () => {


    return (
    <>
        <div class="container" style={{paddingBottom: '10%'}}>


        <Router>

            <NavLink to='About' style={{textDecoration : 'none', textAlign : 'right'}}>
              <h1 style={{fontSize : '150%'}}>About</h1>
            </NavLink>

            <NeonHeader>
                Music Rabbit Hole
            </NeonHeader>

            <br></br>
            <br></br>

            <NavLink to="/">
              <button style={{marginRight : '5%'}} class="btn btn-primary">
                Find <br></br> Random Artist
              </button>
            </NavLink>


            <NavLink to="/SearchArtist">
              <button class="btn btn-primary">
                  Find <br></br> Similar Artists
              </button>
            </NavLink>

            <Route path="/SearchArtist"  component={SearchArtist} />
            <Route path="/about"  component={About} />
        </Router>
        </div>

    </>
    );
}

export default Home;