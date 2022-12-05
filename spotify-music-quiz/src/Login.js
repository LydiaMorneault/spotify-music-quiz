import React, { Component } from 'react';
import data from './quiz';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    redirect
  } from "react-router-dom";

var client_id = 'c247a859f84d42f1bb843f6b8882b425'; // Your client id
var redirect_uri = 'http://localhost:3000/game'; // Your redirect uri

// log in

export class Login extends React.Component {
    constructor(props) {
        super(props);

    }

    state = {

    }

    shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    getRandomSong() {
        var idx = Math.floor(Math.random() * this.songkeys.length);
        var rankey = this.songkeys[idx];
        return this.data[0][rankey];
    }

    generateAnswers(type) {
        let ansType = type;

        // get the answer
        let answer = this.getRandomSong();

        // get random songs, making sure that there are no repeats and the options are discrete
        let songs = [answer.album.name];
        let answers = [];
        let numSongs = 0;

        switch(ansType) {
            case "album":
                answers.push(answer.album.name);
                this.answer = answer.album.name;
        }

        while (numSongs < 4) {
            var song = this.getRandomSong();
            let checkAns;

            switch(ansType) {
                case "album":
                    checkAns = song.album.name;
            }

            if (!songs.includes(song) && !answers.includes(checkAns)) {
                songs.push(song.album.name);
                answers.push(checkAns);
                numSongs++;
            }
        }

        this.setState({answerLabel: answer.name, options: this.shuffle(songs)});
    }

    handleClick(idx) {
        console.log(idx, this.state.options[idx], this.answer);
        let currPts;

        if (this.state.options[idx] === this.answer) {
            currPts = this.state.points + 10;
        
            // TODO: make ding
        } else {
            currPts = this.state.points - 10;     
            // TODO: make womp womp
        }
        this.setState({points: currPts});

    }

    SignIn(){
        //TODO connect to spotify
        // redirect to spotify for login
      
        // your application requests authorization
        var scope = 'user-read-currently-playing user-read-private user-read-email user-top-read user-read-recently-played user-library-read playlist-read-private';
        var url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(client_id);
        url += '&scope=' + encodeURIComponent(scope);
        url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
      
        console.log("Redirecting to " + url);

        window.location = url;

    }


    render() {
        return (
        <div>
            <div className='App'>
                <header className='App-header'>
                    <h1>I'll Be Home for Quiz Mice</h1>
                </header>
            </div>

            <div>
                <button onClick={() => {this.SignIn()}}>Sign in to Spotify</button>
            </div>
        </div>
        );
    }
    
}


