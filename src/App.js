import React, { Component } from 'react';
import './App.css';
// Clarifai
import Clarifai from 'clarifai';
// Components
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
// React-Particles-JS
import Particles from 'react-particles-js';
// Global Environmental Variables for API
import env from './env.json';
const apikey = env['apikey'];
//Clarifai Initialization
const app = new Clarifai.App ({
    apiKey: apikey
});

// https://www.npmjs.com/package/react-particles-js
// https://vincentgarreau.com/particles.js/
const particlesOptions = {
particles: {
    number: {
      value: 125,
      density: {
        enable: true,
        value_area: 800
      }
    },
    size: {
      value: 3,
      random: true
    },
    opacity: {
      value: 0.5
    },
    move: {
      enable: true,
      random: true,
      speed: 8
    }
 }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '' /* What the user will input */
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = (event) => {
    console.log('click');
    app.models.predict(
        Clarifai.COLOR_MODEL,
        // URL
        "https://samples.clarifai.com/metro-north.jpg")
  .then(function(response) {
        // do something with response
      console.log(response);
      },
      function(err) {
        // there was an error
      }
    );
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles"
                params={particlesOptions}
              />
          <Navigation />
          <Logo />
          <Rank />
         <ImageLinkForm
           onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}
         />
         {/*
        <FaceRecognition />*/}
      </div>
    );
  }
}

export default App;
