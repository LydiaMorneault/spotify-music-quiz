import React, { Component } from 'react';

// var client_id = 'c247a859f84d42f1bb843f6b8882b425'; // Your client id
var client_id = '5b47e9f22f754e0287e17a540eb1328d'; // Your client id
var redirect_uri = 'http://localhost:3000/game'; // Your redirect uri

// log in

export class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    SignIn(){
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
                    <h1>Music Quiz</h1>
                </header>
            </div>

            <div className='loginBtn'>
                <button className='button-3' onClick={() => {this.SignIn()}}>Sign in to Spotify</button>
            </div>
        </div>
        );
    }
    
}


