import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.cost * item.quantity;
    });
    return total;
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container" style={{ margin: '40px auto', maxWidth: '800px', padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <p>Your cart is empty.</p>
          <button onClick={(e) => onContinueShopping(e)} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '20px' }}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '20px', borderRadius: '4px' }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 10px 0' }}>{item.name}</h3>
                <p style={{ margin: '0 0 10px 0' }}>Price: ${item.cost}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <button onClick={() => handleDecrement(item)} style={{ width: '30px', height: '30px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc' }}>-</button>
                  <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)} style={{ width: '30px', height: '30px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc' }}>+</button>
                </div>
                <p style={{ marginTop: '10px', fontWeight: 'bold' }}>Subtotal: ${item.cost * item.quantity}</p>
              </div>
              <button onClick={() => handleRemove(item)} style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
            </div>
          ))}
          <div className="cart-total" style={{ marginTop: '30px', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '20px' }}>Total Amount: ${calculateTotalAmount()}</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <button onClick={(e) => onContinueShopping(e)} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '15px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
                Continue Shopping
              </button>
              <button style={{ backgroundColor: '#f0ad4e', color: 'white', padding: '15px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
