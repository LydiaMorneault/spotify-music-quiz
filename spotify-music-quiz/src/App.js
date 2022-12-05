import React, { Component } from 'react';
import { Game } from './Game';
import {Login} from './Login';
// import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  redirect,
} from "react-router-dom";


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
      
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />      
          <Route path="/game*" element={<Game/>}/>
        </Routes>
      </Router>
      
    );
  }
}

export default App;
