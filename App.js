import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// import pages
import Home from './Home';
import About from '.About';

export default function App() {
    return(
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
        </Router>
    );
}