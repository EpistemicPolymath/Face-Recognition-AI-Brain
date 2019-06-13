import React from 'react';
import './App.css';
// Components
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';

function App() {
  return (
    <div className="App">
        <Navigation />
        <Logo />
      {/* <ImageLinkForm />
      <FaceRecognition />*/}
    </div>
  );
}

export default App;
