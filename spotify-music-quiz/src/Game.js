import React, { Component } from 'react';
import { data, questions } from './quiz';

export class Question extends React.Component {
    constructor(props) {
        super(props);
        let idx = 0;
        this.q = JSON.parse(questions);
        this.keys = Object.keys(this.q[0]);
        this.data = JSON.parse(data);
        this.songkeys = Object.keys(this.data[0]);
        this.question = "blank";
    }

    generateAnswers(type) {
        let ansType = type;

        // get random questions, making sure that there are no repeats and the options are discrete
        
        this.data = JSON.parse(data);
        this.songkeys = Object.keys(this.data[0]);
        var rankey = this.songkeys[Math.floor(Math.random() * this.songkeys.length)]
        this.question = this.songkeys[rankey];


        switch(ansType) {
            case "album":
                // add question 
        }



        // return options;
    }


    render() {

        // var rankey = this.keys[Math.floor(Math.random() * this.keys.length)]
        // var question = this.q[0][rankey];
// 
        let options = this.generateAnswers("album");

        


        return (
            <div>
                <h1>{this.songkeys[0]}</h1>
                <button>Option 1</button>
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