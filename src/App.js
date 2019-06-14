import React from 'react';
import './App.css';
// Components
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';


function App() {
  return (
    <div className="App">
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
