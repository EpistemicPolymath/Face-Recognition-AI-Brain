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
      route: 'signin', /* Keeps track of the active page */
      isSignedIn: false, /* Is the user signed in? */
      user: { /* User Profile */
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

// Loads new users information into the Front-End
  loadUser = (newUser) => {
    this.setState({user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        entries: newUser.entries,
        joined: newUser.joined
    }})
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

  onImageSubmit = (event) => {
    this.setState({imgUrl: this.state.input});
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        // URL
        this.state.input)
  .then(response => {
    // As long as we have a response from the API
    if (response) {
      // Increment Image Entries at Endpoint
      fetch('http://localhost:3000/image', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: this.state.user.id
        })
      })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}));
        })
    }
  this.displayFaceBox(this.calculateFaceLocation(response))
  })
  .catch(error => console.log(error));
  }

/* Dynamically Setup routing */
  onRouteChange = (route) => {
    // isSignedIn Setup
    if(route === 'signout') {
      this.setState({isSignedIn: false});
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  appContent = () => {
    // Destructuring
    const { imgUrl, route, box } = this.state;
    switch(route) {
      case 'signin':
        return <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
      case 'register':
        return <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}
        />
      case 'home':
        return (
          <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
             <ImageLinkForm
               onInputChange={this.onInputChange} onImageSubmit={this.onImageSubmit}
             />
             <FaceRecognition
               box={box}
               imgUrl={imgUrl}
             />
           </div>
        )
      default:
      return <SignIn onRouteChange={this.onRouteChange}/>;
    }
  }

  render() {
    // Destructuring
    const { isSignedIn } = this.state;
    return (
      <div className="App">
        <Particles className="particles"
                params={particlesOptions}
              />
          <Navigation
            isSignedIn={isSignedIn}
            onRouteChange={this.onRouteChange}
          />
          {this.appContent()}
      </div>
    );
  }
}

export default App;
