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
