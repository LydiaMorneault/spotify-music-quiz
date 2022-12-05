import React, { Component } from 'react';
import { questions } from './quiz'


export class Question extends React.Component {
    constructor(props) {
        super(props);

        this.q = JSON.parse(questions);
        this.keys = Object.keys(this.q[0]);
        this.songData = {};
        this.songkeys = [];

    }

    state = {
        idx: 1,
        question: "blank",
        answerLabel: "",
        answerTrack: "",
        options: [],
        points: 0,
        currentQ: null
    }

    shuffle(array) { // source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
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
        var len = Object.keys(this.songData).length;
        var idx = Math.floor(Math.random() * len);
        return this.songData[idx];
    }


    generateAnswers(type) {
        let ansType = type;

        // get the answer
        let answer = this.getRandomSong();


        // get random songs, making sure that there are no repeats and the options are discrete
        let songs = [answer];
        let answers = [];
        let numSongs = 0;

        // get value based on what's needed for the question
        switch(ansType) {
            case "album":
                answers.push(answer.album.name);
                this.setState({
                    answerLabel: answer.album.name,
                    answerTrack: answer.name
                });
                break;
            case "year":
                answers.push(answer.album.release_date);
                this.setState({
                    answerLabel: answer.album.release_date,
                    answerTrack: answer.name
                });
                break;
        }

        // gets 4 total options for answers
        while (numSongs < 3) {
            var song = this.getRandomSong();
            let checkAns;
            let songAns;

            switch(ansType) {
                case "album":
                    checkAns = song.album.name;
                    break;
                case "year":
                    checkAns = song.album.release_date;
                    break;
            }

            // make sure there are no duplicates
            if (!songs.includes(song) && !answers.includes(checkAns)) {
                songs.push(song);
                answers.push(checkAns);
                numSongs++;
            }
        }


        this.setState({options: this.shuffle(answers)});
    }


    handleClick(idx) {
        // console.log(idx, this.state.options[idx], this.state.answerLabel);
        let currPts;

        if (this.state.options[idx] === this.state.answerLabel) {
            currPts = this.state.points + 10;
            console.log("CORRECT!");
        
            // TODO: make ding
        } else {
            currPts = this.state.points - 10; 
            console.log("WRONG!");
            // TODO: make womp womp
        }

        // if there are no more questions, end game
        if (this.state.idx < this.keys.length) {
            this.setState({
                points: currPts,
                idx: this.state.idx + 1,
                question: "blank",
                answerLabel: "",
                answerTrack: "",
                options: [],
                currentQ: this.q[0][`${this.state.idx + 1}`]
            });
            this.generateAnswers(this.q[0][this.state.idx+1].answerType);
        } else {
            this.setState({
                points: currPts,
                idx: this.state.idx + 1,
                question: "Game Over",
                answerLabel: "",
                answerTrack: "",
                options: [],
            });
        }

    }

    onStart(){
        // pull URI songData, get songData from API

        var params = new URLSearchParams(window.location.hash.replace('#',""));
        var access_token = params.get('access_token');

        var placeholder;

        fetch("https://api.spotify.com/v1/me/top/tracks/" , {
            headers: {
                'Authorization': 'Bearer ' +  access_token,
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((jsonsongData) => {
            this.songData=jsonsongData.items;
        })
        .catch(console.error);

        this.generateAnswers("album");
        console.log("Started");

        let ques = this.q[0][`${this.state.idx}`];

        this.setState(({
            currentQ: ques
        }));

    }


    render() {


        return (
            <div>
                <button className='begin' onClick={() => {this.onStart()}}>Begin</button>
                <p>Points: {this.state.points}</p>
                <div className='board'>
                    <h1>{this.state.currentQ ? this.state.currentQ.query : ""}</h1>
                    <h2 className='question'>{this.state.answerTrack}</h2>
                    <button className='btn' onClick={() => {this.handleClick(0)}}>{this.state.options[0]}</button>
                    <button className='btn' onClick={() => {this.handleClick(1)}}>{this.state.options[1]}</button>
                    <button className='btn' onClick={() => {this.handleClick(2)}}>{this.state.options[2]}</button>
                    <button className='btn' onClick={() => {this.handleClick(3)}}>{this.state.options[3]}</button>
                </div>
            </div>
        );
    }
    
}

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionNum: 0
        };
    }

    render() {

        return (
            <div className="game">
                <Question />
                {/* {Object.keys(songs[0])} */}
            </div>
        );
    }
}