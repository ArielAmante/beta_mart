import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function CartList({ cartItem, clearCart }) {
  const [data, setData] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [shippingData, setShippingData] = useState({ name: '', address: '', city: '', paymentMode: 'Online Payment' });

  const user = JSON.parse(localStorage.getItem('user-info'));
  const userId = user ? user.id : '';

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data.length === 0) {
      setShowCheckout(false);
    }
  }, [data]);

  async function removeItem(cartId) {
    let result = await fetch("http://127.0.0.1:8000/api/removeitem/" + cartId, {
      method: 'DELETE'
    });
    result = await result.json();
    cartItem();
    getData();
    console.log(result);
  }

  async function getData() {
    let result = await fetch('http://127.0.0.1:8000/api/cartlist/' + userId);
    result = await result.json();
    setData(result);
  }

  const handleInput = (e) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };

  const submitOrder = (e) => {
    e.preventDefault();
    console.log('Shipping Data:', shippingData);
    alert('Your order has been placed. Thank you for your purchase!');
    clearCart();
    setShippingData({ name: '', address: '', city: '', paymentMode: 'Online Payment' });
    setShowCheckout(false);
  };

  const totalPrice = data.reduce((total, item) => total + item.price * item.qty, 0);

  return (
    <>
      <main className="veiw-h">
        <div className="col-8 m-auto bg-white p-3 mt-3">
          <div className="row g-1 border-bottom">
            <h2 className="col-9">Shopping Cart</h2>
            {data.length > 0 && (
              <button className="btn btn-info col-3 mb-1" onClick={() => setShowCheckout(true)}>Proceed to Payment</button>
            )}
          </div>

          <div className="border-bottom">
            <div className="row g-0">
              {data.map((item) => (
                <div key={item.cart_id} className="row mb-3">
                  <div className="col-md-4">
                    <img src={"http://127.0.0.1:8000/storage/gallery/" + item.gallery} className="img-fluid rounded-start" alt="product pic" />
                  </div>
                  <div className="col-md-6">
                    <div className="card-body">
                      <a href="detail/{{$product['id']}}" className="text-decoration-none underline">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text text-truncate">{item.description}</p>
                      </a>
                      <p className="card-text">
                        <small className="text-danger"><b> Unit price:</b> ₱ {item.price}</small>
                        <small className="text-danger"><b> Qty:</b>{item.qty}</small>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button className="btn btn-warning mt-3" onClick={() => removeItem(item.cart_id)}>Remove Item</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {!data[0] && <div className="text-danger fs-4 text-center">Sorry, Cart is empty!!</div>}

          {showCheckout && (
            <div className="checkout-form mt-4">
              <h2>Shipping Information</h2>
              <form onSubmit={submitOrder}>
                <div className="mb-3">
                  <label className="form-label">Name:</label>
                  <input type="text" name="name" className="form-control" value={shippingData.name} onChange={handleInput} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address:</label>
                  <input type="text" name="address" className="form-control" value={shippingData.address} onChange={handleInput} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">City:</label>
                  <input type="text" name="city" className="form-control" value={shippingData.city} onChange={handleInput} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Mode of Payment:</label>
                  <select name="paymentMode" className="form-control" value={shippingData.paymentMode} onChange={handleInput} required>
                    <option value="Online Payment">Online Payment</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit Order</button>
              </form>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
