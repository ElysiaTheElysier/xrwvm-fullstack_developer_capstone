import React, { useState } from 'react';
import './App.css';
import AboutUs from './AboutUs';
import ProductList from './ProductList';

function App() {
  const [showProducts, setShowProducts] = useState(false);

  const handleGetStarted = () => {
    setShowProducts(true);
  };

  return (
    <div className="App">
      {!showProducts ? (
        <div className="landing-page">
          <h1>Welcome to Paradise Nursery</h1>
          <p>Where Green Meets Serenity</p>
          <AboutUs />
          <button className="get-started-btn" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      ) : (
        <div className="main-content">
          <ProductList />
        </div>
      )}
    </div>
  );
}

export default App;
