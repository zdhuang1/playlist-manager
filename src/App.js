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

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Callback from './pages/Callback';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/callback" element={<Callback />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
