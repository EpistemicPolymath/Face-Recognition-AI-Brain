import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
    {/*
    https://www.npmjs.com/package/react-tilt
    https://icons8.com/icon/2069/brain
    */}
  return (
      <div className="ma4 mt0">
        <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
          <div className="Tilt-inner pa3"> <img style={{paddingTop: '5px'}} alt="brain logo" src={brain}/></div>
        </Tilt>
      </div>
  );
}

export default Logo;
