import React, { Component } from 'react';
import { data, questions } from './quiz';

export class Question extends React.Component {
    constructor(props) {
        super(props);

        this.q = JSON.parse(questions);
        this.keys = Object.keys(this.q[0]);
        this.data = JSON.parse(data);
        this.songkeys = Object.keys(this.data[0]);

    }

    state = {
        idx: 0,
        question: "blank",
        answerLabel: "",
        answerTrack: "",
        options: [],
        points: 0
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

    onStart(){
        this.generateAnswers("album");
        console.log("Started");
        console.log("Points", this.state.points);

    }


    render() {

        var question = this.q[0][1];
       

        return (
            <div>
                <button onClick={() => {this.onStart()}}>Begin</button>
                <div className='board'>
                    <h1>{this.q[0]["1"].query}</h1>
                    <h2 className='question'>{this.state.answerLabel}</h2>
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