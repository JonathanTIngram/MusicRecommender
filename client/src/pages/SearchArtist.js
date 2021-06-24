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

var SearchArtist = (props) => {


    var [originalArtist, setoriginalArtist] = useState();
    var [similarList, setSimilarList] = useState([]);
    var [artistImages, setArtistImages] = useState([]);


    const socketRef = useRef()

    //send to backend
    const postOriginalArtist = (originalA) =>{

        setoriginalArtist([])
        console.log(`This is from props ${props}`)
        if (props.location == null){
            setoriginalArtist(originalA);
        }
        else {
            setoriginalArtist(props.location.artist);
        }

        // axios.post('http://localhost:3001/postOriginal', {
        //   original: originalA
        //               }).then(() =>{
        //                 alert('successful insert');
        //             }).then( () => {
        //               console.log("Successfully sent to port 3001");
        //             });
    };

    //recieve from backend
    var getSimilarArtists = () => {

        socketRef.current = io.connect("http://localhost:4000")
        socketRef.current.emit("originalArtist", originalArtist);

        socketRef.current.on("sendSimilar", (similar) => {
            setSimilarList(similar);

        })
        socketRef.current.on("artistImages", (images) => {
            setArtistImages(images)
            console.log(images)
        })


        return () => socketRef.current.disconnect()
    }

    var showSimilarList = (i) => {
        setoriginalArtist(similarList[i])
        getSimilarArtists();


        return (
            <>
                <SearchArtist artist={similarList[0]}></SearchArtist>
            </>
        );
    }

    var loadingEffect = () => {

        return (
        <>
        
            <Loader></Loader>
            
        </>
        );
    }

    var showSimilarArtists = () => {

        if(similarList == null){
            console.log('Empty Similar Artist List');

            return (
                <>
                    <h1>No Artists Found</h1>
                </>
            );
        }
        else {

            return (

                <>


                    <h1>Artists Similar to {originalArtist}</h1>
                    <br></br>
                    <Loader></Loader>
                    <Router>
                        
                        <NavLink
                            onClick={() => {
                                 return (
                                     <SearchArtist artist={similarList[0]}></SearchArtist>
                                 );
                            }}
                            style={{textDecoration : 'none'}}>

                                <h2>{similarList[0]}</h2>
                                <img style={{opacity : '45%', borderRadius : '5%', width : '80%', height : '80%'}} src={artistImages[0]}></img>
                                <div style={{paddingBottom : '5%'}}></div>
                        
                        </NavLink>

                        <NavLink
                            onClick={() => {
                                showSimilarList(1);
                            }}
                            style={{textDecoration : 'none'}}>

                                <h2>{similarList[1]}</h2>
                                <img style={{opacity : '45%', borderRadius : '5%', width : '80%', height : '80%'}} src={artistImages[1]}></img>
                                <div style={{paddingBottom : '5%'}}></div>
                        </NavLink>

                        <NavLink
                            onClick={() => {
                                showSimilarList(2);
                            }}
                            style={{textDecoration : 'none'}}>

                                <h2>{similarList[2]}</h2>
                                <img style={{opacity : '45%', borderRadius : '5%', width : '80%', height : '80%'}} src={artistImages[2]}></img>
                                <div style={{paddingBottom : '5%'}}></div>
                        </NavLink>

                        <NavLink
                            onClick={() => {
                                showSimilarList(3);
                            }}
                            style={{textDecoration : 'none'}}>

                                <h2>{similarList[3]}</h2>
                                <img style={{opacity : '45%', borderRadius : '5%', width : '80%', height : '80%'}} src={artistImages[3]}></img>
                                <div style={{paddingBottom : '5%'}}></div>
                        </NavLink>

                        <NavLink
                            onClick={() => {
                                showSimilarList(4);
                            }}
                            style={{textDecoration : 'none'}}>

                                <h2>{similarList[4]}</h2>
                                <img style={{opacity : '45%', borderRadius : '5%', width : '80%', height : '80%'}} src={artistImages[4]}></img>
                                <div style={{paddingBottom : '5%'}}></div>
                        </NavLink>

                    </Router>
                
                </>
            );
        }
    }



    return (
        <>
            <br></br>
            <br></br>
            <br></br>
            <h1>Find Similar Artists by <br></br> Searching Your Favorite Artists</h1>
            <input style={{textAlign : 'center'}} class="form-control" id="floatingInput" onChange={(e) =>{
                setoriginalArtist(e.target.value);
            }
            }></input>
            <br></br>

            <BlueButton>

            <button  class="btn btn-info" onClick={() => {
            console.log(originalArtist);
            getSimilarArtists();
            }}>Find New Music</button>

            </BlueButton>

            <br></br>
            <br></br>
            <br></br>

            {showSimilarArtists()}

            <br style={{width : '50%'}}></br>


    
            <div style={{paddingTop : '0%'}}>
            

            </div>

        </>
    )
}

export default SearchArtist;