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
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';
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
      imgUrl: '', /* The user's inputed image URL */
      box: {}, /* Refers to the bounding_box data from Clarifai */
      route: 'signin' /* Keeps track of the active page */
    }
  }

  calculateFaceLocation = (data) => {
    // This grabs only one face region - Gives a percentage
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
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
  .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
  .catch(error => console.log(error));
  }

/* Dynamically Setup routing */
  onRouteChange = (route) => {
    this.setState({route: route});
  }

  appContent = () => {
    switch(this.state.route) {
      case 'signin':
        return <SignIn onRouteChange={this.onRouteChange}/>
      case 'register':
        return <Register onRouteChange={this.onRouteChange}/>
      case 'home':
        return (
          <div>
              <Logo />
              <Rank />
             <ImageLinkForm
               onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}
             />
             <FaceRecognition
               box={this.state.box}
               imgUrl={this.state.imgUrl}
             />
           </div>
        )
      default:
      return null;
    }
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles"
                params={particlesOptions}
              />
          <Navigation onRouteChange={this.onRouteChange}/>
          {this.appContent()}
      </div>
    );
  }
}

export default App;
