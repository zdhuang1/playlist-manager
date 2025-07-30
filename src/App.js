// To run backend: node server.js
// Run the following from the 'playlist-manager' dir
//    - To launch React frontend (browser version): npm start
//    - To launch React frontend (desktop version): npm run electron 

/*
 * Don't worry about dev packages bc they wont be shipped.
 * 
 * Good practice is to periodically run: 
 *    npm outdated                # see what you can bump
 *    npx npm-check-updates -u    # update ranges in package.json
 *    npm install 
 * This shows outdated packages and allows you to update dependencies
 * 
 * If package vulnerabilites are stuck, try:
 *    rm -rf node_modules package-lock.json
 *    npm install
 */

import logo from './logo.svg';
import './App.css';

import React, { useEffect } from 'react';
import { getTopTracks } from './spotifyApi';

const topTracks = await getTopTracks();
console.log(
  topTracks?.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);


function App() {
  useEffect(() => {
    async function fetchTracks() {
      const topTracks = await getTopTracks();
      console.log(
        topTracks?.map(
          ({ name, artists }) =>
            `${name} by ${artists.map(artist => artist.name).join(', ')}`
        )
      );
    }
    fetchTracks();
  }, []);
  
  return (
      <div className="App">
      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
          Pick a song
          </p>

          <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          >
          Learn React
          </a>
      </header>
      </div>
  );
}

export default App;
