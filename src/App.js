import React, { Component } from 'react';
import './App.css';
// Clarifai
import Clarifai from 'clarifai';
// Components
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
// React-Particles-JS
import Particles from 'react-particles-js';
// Global Environmental Variables for API - For Privacy
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
      input: '', /* What the user will input */
      imgUrl: '' /* The user's inputed image URL */
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = (event) => {
    this.setState({imgUrl: this.state.input});
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        // URL
        this.state.input)
  .then(function(response) {
        // do something with response
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
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
        <FaceRecognition imgUrl={this.state.imgUrl}/>
      </div>
    );
  }
}

export default App;
