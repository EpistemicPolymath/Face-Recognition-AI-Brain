import React from 'react';
import './App.css';
// Components
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
// React-Particles-JS
import Particles from 'react-particles-js';
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

function App() {
  return (
    <div className="App">
      <Particles className="particles"
              params={particlesOptions}
            />
        <Navigation />
        <Logo />
        <Rank />
       <ImageLinkForm />
       {/*
      <FaceRecognition />*/}
    </div>
  );
}

export default App;
