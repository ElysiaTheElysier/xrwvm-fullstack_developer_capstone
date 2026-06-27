import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

const ProductList = () => {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = React.useState(false);

  const plants = [
    { name: 'Monstera Deliciosa', cost: 25, image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d40?auto=format&fit=crop&q=80&w=400' },
    { name: 'Fiddle Leaf Fig', cost: 35, image: 'https://images.unsplash.com/photo-1597055964860-93a9fa93e244?auto=format&fit=crop&q=80&w=400' },
    { name: 'Snake Plant', cost: 15, image: 'https://images.unsplash.com/photo-1593482892288-592fbc0430b2?auto=format&fit=crop&q=80&w=400' },
    { name: 'Peace Lily', cost: 20, image: 'https://images.unsplash.com/photo-1593482892557-41712a4df0c3?auto=format&fit=crop&q=80&w=400' },
    { name: 'Spider Plant', cost: 12, image: 'https://images.unsplash.com/photo-1593482892188-463dfb12e33d?auto=format&fit=crop&q=80&w=400' },
    { name: 'Aloe Vera', cost: 10, image: 'https://images.unsplash.com/photo-1596547609652-9cb5b4d7c046?auto=format&fit=crop&q=80&w=400' }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  return (
    <div>
      <div className="navbar" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', backgroundColor: '#4CAF50', color: 'white' }}>
        <h2 style={{ margin: 0 }}>Paradise Nursery</h2>
        <a href="#" onClick={handleCartClick} style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>
          Cart
        </a>
      </div>
      {!showCart ? (
        <div className="product-list-container" style={{ padding: '20px' }}>
          <h2 style={{ textAlign: 'center' }}>Our Plants</h2>
          <div className="product-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            {plants.map((plant, index) => (
              <div key={index} className="product-card" style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', width: '250px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }} />
                <h3>{plant.name}</h3>
                <p>${plant.cost}</p>
                <button onClick={() => handleAddToCart(plant)} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
};

export default ProductList;
