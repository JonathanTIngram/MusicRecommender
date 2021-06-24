import axios from "axios";
import React, { useEffect, useRef, useState } from "react"
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import io from "socket.io-client"


export const NavLink = styled(Link)`
  text-decoration : none;


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

  h2 {
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
`;

export const BlueButton = styled.div`
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

`;

export const Loader = styled.div`

    $base-line-height: 24px;
    $white: rgb(255,255,255);
    $off-white: rgba($white, 0.2);
    $spin-duration: 1s;
    $pulse-duration: 750ms;

    border-radius: 50%;
    width: $base-line-height;
    height: $base-line-height;
    border: .25rem solid $off-white;
    border-top-color: $white;
    animation: spin $spin-duration infinite linear;

`;

var SearchVibe = (props) => {


    var [vibe, setVibe] = useState();
    var [playlistURL, setplaylistURL] = useState();


    var socketRef = useRef()


    //recieve from backend
    var getPlaylist = () => {

        socketRef.current = io.connect("http://localhost:4000");
        socketRef.current.emit('sendKeyword', vibe);

        socketRef.current.on('playlist', (playlist) => {
            setVibe(playlist.name);
            setplaylistURL(playlist.url);
        })

        return () => socketRef.current.disconnect()
    }

    return (
        <>
            <br></br>
            <br></br>
            <br></br>
            <h1>Find a Playlist by<br></br> Searching a Key Word</h1>
            <input style={{textAlign : 'center'}} class="form-control" id="floatingInput" onChange={(e) =>{
                setVibe(e.target.value);
            }
            }></input>
            <br></br>

            <BlueButton>

            <button  class="btn btn-info" onClick={() => {
            console.log(vibe);
            getPlaylist();

            }}>Find New Music</button>

            </BlueButton>

            <br></br>
            <br></br>
            <br></br>


            <br style={{width : '50%'}}></br>
            
            <a href={{playlistURL}} target="_blank">
                <h1>Playlist for : <h1>{vibe}</h1></h1>
                {playlistURL}
            </a>

    
            <div style={{paddingTop : '0%'}}>
            

            </div>

        </>
    )
}

export default SearchVibe;