import axios from "axios";
import React, { useEffect, useRef, useState } from "react"
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import io from "socket.io-client"


export const JonLink = styled.a`

    color : #e83283;
    text-decoration : none;

    &:hover {
        color : #30add5;
    }

`;


export const LastFMLink = styled.a`

    color : #30add5;
    text-decoration : none;

    &:hover {
        color : #e83283;
    }

`;

var Home = () => {


    return (
        <>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

            <div>
                <h1>About this Project</h1>
            </div>
            <div>
                <p>This project was created by <JonLink href="https://github.com/JonathanTIngram"> Jonathan Ingram </JonLink>
                   by utilizing the <LastFMLink href="https://www.last.fm/api"> Last FM API </LastFMLink></p>
            </div>

            <div>
                <p>
                The idea for this project came from finding new music by looking through YouTube recommendations
                    for music already know. The thought process is, that this website would streamline that process.
                </p>
            </div>

            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <div>
                <p>If you're interested in looking at this project's source code,
                    check this project out on Github.
                </p>

                <a href='https://github.com/JonathanTIngram/MusicRecommender'>
                    <img style={{width : '15%'}} src="https://cdn.iconscout.com/icon/free/png-256/github-3215409-2673827.png">
                    </img>
                </a>
            </div>
        </>
    );
}

export default Home;