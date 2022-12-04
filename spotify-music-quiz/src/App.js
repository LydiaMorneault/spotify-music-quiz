import React, { Component } from 'react';
import { Game } from './Game';
// import './App.css';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: ""};
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err);
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>I'll Be Home for Quiz Mice</h1>
        </header>
        <Game />
      </div>
    );
  }
}

export default App;
