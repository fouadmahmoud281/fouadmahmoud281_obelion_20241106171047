import React from 'react';
import Auth from './components/Auth/Login.js';
import Venues from './components/Venues/VenueList.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the React App</h1>
      </header>
      <main>
        <Auth />
        <Venues />
      </main>
    </div>
  );
}

export default App;
