import React from 'react';

function Home() {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Welcome to My App!</h1>
        <p>This is the home page.</p>
        <a href="/about">Go to About Page</a>
        </div>
    );
}

export default Home;